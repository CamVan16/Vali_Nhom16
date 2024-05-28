package com.nhom16.vali.entity;

public class Description {
    // thành phần dữ liệu
    private String branch;
    private String material;
    private String weight;
    private String size;
    private String volume;
    private String wheel;
    private String key;
    private String warranty;

    // thành phần phương thức
    public Description(String branch, String material, String weight, String size, String volume, String wheel,
            String key, String warranty) {
        this.branch = branch;
        this.material = material;
        this.weight = weight;
        this.size = size;
        this.volume = volume;
        this.wheel = wheel;
        this.key = key;
        this.warranty = warranty;
    }

    public Description() {
    }

    // Getters and Setters
    public String getBranch() {
        return branch;
    }

    public void setBranch(String branch) {
        this.branch = branch;
    }

    public String getMaterial() {
        return material;
    }

    public void setMaterial(String material) {
        this.material = material;
    }

    public String getWeight() {
        return weight;
    }

    public void setWeight(String weight) {
        this.weight = weight;
    }

    public String getSize() {
        return size;
    }

    public void setSize(String size) {
        this.size = size;
    }

    public String getVolume() {
        return volume;
    }

    public void setVolume(String volume) {
        this.volume = volume;
    }

    public String getWheel() {
        return wheel;
    }

    public void setWheel(String wheel) {
        this.wheel = wheel;
    }

    public String getKey() {
        return key;
    }

    public void setKey(String key) {
        this.key = key;
    }

    public String getWarranty() {
        return warranty;
    }

    public void setWarranty(String warranty) {
        this.warranty = warranty;
    }

    @Override
    public String toString() {
        return "Description{" +
                "branch='" + branch + '\'' +
                ", material='" + material + '\'' +
                ", weight='" + weight + '\'' +
                ", size='" + size + '\'' +
                ", volume='" + volume + '\'' +
                ", wheel='" + wheel + '\'' +
                ", key='" + key + '\'' +
                ", warranty='" + warranty + '\'' +
                '}';
    }
}
