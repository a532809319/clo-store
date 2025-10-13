import { createSlice } from '@reduxjs/toolkit';

// 模拟产品数据
const initialProducts = [
  {
    id: 1,
    name: "无线耳机",
    price: 1299,
    description: "高品质音效，舒适佩戴",
    isPaid: true,
    isViewOnly: false
  },
  {
    id: 2,
    name: "智能手表",
    price: 2199,
    description: "健康监测，多功能运动模式",
    isPaid: true,
    isViewOnly: false
  },
  {
    id: 3,
    name: "免费电子书",
    price: 0,
    description: "编程入门指南",
    isPaid: false,
    isViewOnly: false
  },
  {
    id: 4,
    name: "预览视频",
    price: 0,
    description: "产品介绍视频",
    isPaid: false,
    isViewOnly: true
  },
  {
    id: 5,
    name: "高级会员",
    price: 399,
    description: "解锁全部高级功能",
    isPaid: true,
    isViewOnly: false
  }
];

const productSlice = createSlice({
  name: 'products',
  initialState: {
    products: initialProducts,
    filteredProducts: initialProducts,
    filters: {
      paid: false,
      free: false,
      viewOnly: false
    }
  },
  reducers: {
    setFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
      
      // 根据筛选条件过滤产品
      state.filteredProducts = state.products.filter(product => {
        let matches = true;
        
        if (state.filters.paid && !product.isPaid) {
          matches = false;
        }
        
        if (state.filters.free && product.price > 0) {
          matches = false;
        }
        
        if (state.filters.viewOnly && !product.isViewOnly) {
          matches = false;
        }
        
        return matches;
      });
    },
    resetFilters: (state) => {
      state.filters = {
        paid: false,
        free: false,
        viewOnly: false
      };
      state.filteredProducts = state.products;
    }
  }
});

export const { setFilters, resetFilters } = productSlice.actions;
export default productSlice.reducer;