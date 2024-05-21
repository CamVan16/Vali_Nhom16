import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { searchProduct as searchProductAction } from '../../redux/slices/productSlice';
import { useQuery } from '@tanstack/react-query';
import * as ProductService from '../../services/ProductService';
import CardComponent from '../../components/CardComponent/CardComponent';
import { WrapperProducts, WrapperButtonMore, Container, WrapperDiv } from './style';
import FilterPriceComponent from '../../components/FilterPriceComponent/FilterPriceComponent';
import SortComponent from '../../components/SortComponent/SortComponent';
import FilterProducerComponent from '../../components/FilterProducerComponent/FilterProducerComponent';  

const SearchResult = () => {
    const location = useLocation();
    const dispatch = useDispatch();
    const searchParams = new URLSearchParams(location.search);
    const query = searchParams.get('query') || '';
    const producer = useSelector(state => state.product.selectedProducer); 
    const initialSort = searchParams.get('sort') || '';
    const minPrice = searchParams.get('minPrice') || '0';
    const maxPrice = searchParams.get('maxPrice') || '1000000000';

    const [limit, setLimit] = useState(10);
    const [sort, setSort] = useState(initialSort);
    const [priceRange, setPriceRange] = useState([minPrice, maxPrice]);

    useEffect(() => {
        dispatch(searchProductAction(query));
    }, [query, dispatch]);

    useEffect(() => {
        if (initialSort !== sort || priceRange[0] !== minPrice || priceRange[1] !== maxPrice) {
            setSort(initialSort);
            setPriceRange([minPrice, maxPrice]);
        }
    }, [initialSort, minPrice, maxPrice, sort, priceRange]);

    const { isLoading, data: products, error } = useQuery({
        queryKey: ['products', query, priceRange, limit, sort, producer],
        queryFn: () => ProductService.getAllProduct(query, priceRange, limit, sort, producer),
        retry: 3,
        retryDelay: 1000
    });

    
    if (isLoading) return <div></div>;
    if (error) return <div>Error fetching products: {error.message}</div>;

    const renderSearchResultCount = () => {
        if (!query && !producer) {
            return null;
        }
        return products?.data?.length > 0 ? (
            <div style={{ paddingTop: '20px', fontSize: '16px', color: '#161617', marginLeft: '20px' }}>
                {(query !== '') && (<>Kết quả tìm kiếm cho <strong>"{query}"</strong>:</>)}
            </div>
        ) : (
            <div style={{ margin: '20px 0', fontSize: '20px', marginLeft: '24px' }}>Không tìm thấy sản phẩm.</div>
        );
    };

    return (
        <WrapperDiv>
            {renderSearchResultCount()}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', margin: '0px auto', paddingTop: '20px', maxWidth: '1240px' }}>
                {products?.data?.length > 0 && (
                <>
                <div style={{ display: 'flex', gap: '10px' }}> 
                    <FilterPriceComponent />
                    <FilterProducerComponent />
                </div>
                    <SortComponent />
                </>
                )} 
            </div>
            <WrapperProducts>
                {products?.data?.map(product => (
                    <CardComponent key={product.id} {...product} />
                ))}
            </WrapperProducts>
            {products?.data?.length >= 10 && (
                <div style = {{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                    <WrapperButtonMore
                    textButton="Xem thêm"
                    type="outline"
                    onClick={() => setLimit(prev => prev + 10)}
                    styleButton={{ border: '1px solid rgb(11,116,229)', width: '120px', height: '38px', borderRadius: '4px', marginBottom: '10px' }}
                    styleTextButton={{ fontWeight: '500', color: 'rgb(11,116,229)' }}
                />
                </div>
            )}
        </WrapperDiv>
    );
};

export default SearchResult;