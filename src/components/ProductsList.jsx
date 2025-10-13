import React, { useState, useEffect, useRef, useCallback } from 'react';
import { ThemeProvider, createTheme, Box, Typography, TextField, Button, Checkbox, FormControlLabel, AppBar, Toolbar, Divider, Grid, IconButton } from '@mui/material';
import Search from '@mui/icons-material/Search';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import FavoriteIcon from '@mui/icons-material/Favorite';

// 创建深色主题，自定义断点以符合要求
const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#4CAF50',
    },
    secondary: {
      main: '#2196F3',
    },
    background: {
      default: '#121212',
      paper: '#1E1E1E',
    },
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 480,
      md: 768,
      lg: 1200,
      xl: 1536,
    },
  },
  components: {
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          backgroundColor: 'rgba(255, 255, 255, 0.05)',
        },
      },
    },
    MuiCheckbox: {
      styleOverrides: {
        root: {
          color: 'rgba(255, 255, 255, 0.7)',
          '&.Mui-checked': {
            color: '#4CAF50',
          },
        },
      },
    },
  },
});

const ProductsList = () => {
  // API 基础URL
  const API_URL = 'https://closet-recruiting-api.azurewebsites.net/api/data';

  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    paid: false,
    free: false,
    viewOnly: false
  });
  
  // 从API获取的产品数据
  const [products, setProducts] = useState([]);
  const [isLoadingProducts, setIsLoadingProducts] = useState(false);
  const [error, setError] = useState(null);
  
  // 无限滚动相关状态
  const [displayedProducts, setDisplayedProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const observerRef = useRef(null);
  const lastProductRef = useCallback(node => {
    if (isLoading) return;
    if (observerRef.current) observerRef.current.disconnect();
    observerRef.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && hasMore) {
        loadMoreProducts();
      }
    });
    if (node) observerRef.current.observe(node);
  }, [isLoading, hasMore]);

  // 从API获取产品数据的函数
  const fetchProducts = async () => {
    setIsLoadingProducts(true);
    setError(null);
    
    try {
      const response = await fetch(API_URL);
      if (!response.ok) {
        throw new Error('Failed to fetch products');
      }
      const data = await response.json();
      setProducts(data);
    } catch (err) {
      setError(err.message);
      console.error('Error fetching products:', err);
    } finally {
      setIsLoadingProducts(false);
    }
  };
  
  // 将pricingOption转换为与原UI兼容的属性
  const enhancedProducts = products.map(product => {
    let isPaid = false;
    let isFree = false;
    let isViewOnly = false;
    
    // 根据pricingOption设置属性
    // 0=免费, 1=付费, 2=仅查看
    if (product.pricingOption === 0) {
      isFree = true;
    } else if (product.pricingOption === 1) {
      isPaid = true;
    } else if (product.pricingOption === 2) {
      isViewOnly = true;
    }
    
    // 为了防止图片加载失败，使用picsum.photos作为备用
    const safeImagePath = product.imagePath || `https://picsum.photos/seed/${product.id}/300/400`;
    
    return {
      ...product,
      imagePath: safeImagePath,
      isPaid,
      isFree,
      isViewOnly
    };
  });

  // 根据搜索和过滤条件筛选产品
  const filteredProducts = enhancedProducts.filter(product => {
    // 搜索过滤
    const matchesSearch = product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.creator.toLowerCase().includes(searchTerm.toLowerCase());
    
    // 价格选项过滤
    let matchesFilters = true;
    if (filters.paid && filters.free && filters.viewOnly) {
      // 所有过滤器都选中，显示所有产品
      matchesFilters = true;
    } else if (filters.paid && filters.free) {
      // 只过滤掉viewOnly
      matchesFilters = !product.isViewOnly;
    } else if (filters.paid && filters.viewOnly) {
      // 只过滤掉free
      matchesFilters = product.isPaid || product.isViewOnly;
    } else if (filters.free && filters.viewOnly) {
      // 只过滤掉paid
      matchesFilters = !product.isPaid;
    } else if (filters.paid) {
      matchesFilters = product.isPaid;
    } else if (filters.free) {
      matchesFilters = !product.isPaid && !product.isViewOnly;
    } else if (filters.viewOnly) {
      matchesFilters = product.isViewOnly;
    }
    
    return matchesSearch && matchesFilters;
  });

  const handleFilterChange = (filterType) => {
    setFilters({
      ...filters,
      [filterType]: !filters[filterType]
    });
  };

  const handleResetFilters = () => {
    setFilters({
      paid: false,
      free: false,
      viewOnly: false
    });
    setSearchTerm('');
    // 重置显示的产品和加载状态
    setDisplayedProducts([]);
    setHasMore(true);
  };
  
  // 模拟加载更多产品的函数
  const loadMoreProducts = async () => {
    if (isLoading) return;
    
    setIsLoading(true);
    // 模拟网络请求延迟
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const currentLength = displayedProducts.length;
    const nextBatch = filteredProducts.slice(currentLength, currentLength + 8);
    
    if (nextBatch.length > 0) {
      setDisplayedProducts(prev => [...prev, ...nextBatch]);
    } else {
      setHasMore(false);
    }
    
    setIsLoading(false);
  };
  
  // 当组件挂载时获取产品数据
  useEffect(() => {
    fetchProducts();
  }, []);
  
  // 当筛选条件变化时，重置显示的产品
  useEffect(() => {
    setDisplayedProducts([]);
    setHasMore(true);
    setIsLoading(false);
  }, [filters, searchTerm, products]); // 当产品数据变化时也重置
  
  // 当初始产品数据加载完成且displayedProducts为空时，加载第一批产品
  useEffect(() => {
    if (products.length > 0 && displayedProducts.length === 0) {
      loadMoreProducts();
    }
  }, [displayedProducts.length, products.length]);
  
  // 骨架屏组件
  const ProductSkeleton = () => (
    <Box sx={{ 
      bgcolor: '#1E1E1E', 
      borderRadius: 2, 
      overflow: 'hidden', 
      border: '1px solid rgba(255,255,255,0.1)', 
      width: { xs: '90%', sm: 280 },
      maxWidth: '100%',
      animation: 'pulse 1.5s cubic-bezier(0.4, 0, 0.6, 1) infinite'
    }}>
      <Box sx={{ 
        height: 300, 
        bgcolor: 'rgba(255,255,255,0.05)',
        position: 'relative' 
      }}>
        {/* 骨架屏上的状态标签占位 */}
        <Box sx={{ 
          position: 'absolute', 
          top: 10, 
          left: 10, 
          width: 70, 
          height: 24, 
          bgcolor: 'rgba(255,255,255,0.08)',
          borderRadius: 2 
        }} />
        {/* 骨架屏上的右上角按钮占位 */}
        <Box sx={{ 
          position: 'absolute', 
          top: 10, 
          right: 10, 
          display: 'flex', 
          gap: 8 
        }}>
          <Box sx={{ width: 36, height: 36, bgcolor: 'rgba(255,255,255,0.08)', borderRadius: '50%' }} />
          <Box sx={{ width: 36, height: 36, bgcolor: 'rgba(255,255,255,0.08)', borderRadius: '50%' }} />
        </Box>
      </Box>
      <Box sx={{ p: 3 }}>
        {/* 骨架屏上的创作者名称占位 */}
        <Box sx={{ width: 100, height: 16, bgcolor: 'rgba(255,255,255,0.08)', borderRadius: 1, mb: 2 }} />
        {/* 骨架屏上的产品标题占位 */}
        <Box sx={{ width: '80%', height: 20, bgcolor: 'rgba(255,255,255,0.1)', borderRadius: 1, mb: 3 }} />
        {/* 骨架屏上的价格占位 */}
        <Box sx={{ width: 60, height: 18, bgcolor: 'rgba(255,215,0,0.2)', borderRadius: 1, mb: 2 }} />
        {/* 骨架屏上的统计信息占位 */}
        <Box sx={{ display: 'flex', gap: 16 }}>
          <Box sx={{ width: 80, height: 14, bgcolor: 'rgba(255,255,255,0.05)', borderRadius: 1 }} />
          <Box sx={{ width: 80, height: 14, bgcolor: 'rgba(255,255,255,0.05)', borderRadius: 1 }} />
        </Box>
      </Box>
    </Box>
  );

  return (
    <ThemeProvider theme={darkTheme}>
      <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
        {/* 导航栏 */}
        <AppBar position="static" sx={{ bgcolor: '#000', boxShadow: 'none' }}>
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1, fontWeight: 'bold', color: '#fff' }}>
              CONNECT
            </Typography>
          </Toolbar>
        </AppBar>

        {/* 搜索栏和过滤器容器 - 保持居中宽度 */}
        <Box sx={{ p: 4, mx: 'auto', mb: 2 }}>
          {/* 搜索栏 */}
          <Box sx={{ mb: 4, position: 'relative', bgcolor: '#1E1E1E', borderRadius: 2 }}>
            <TextField
              placeholder="Find the items you're looking for"
              variant="outlined"
              fullWidth
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              sx={{
                '& .MuiInputBase-input': {
                  color: '#fff',
                  pl: '3rem',
                  bgcolor: '#1E1E1E',
                },
                '& .MuiOutlinedInput-notchedOutline': {
                  border: 'none',
                },
              }}
              InputProps={{
                startAdornment: <Search sx={{ position: 'absolute', left: '1rem', color: 'rgba(255,255,255,0.7)' }} />,
                endAdornment: (
                  <IconButton
                    edge="end"
                    sx={{ color: 'rgba(255,255,255,0.7)', mr: 2 }}
                  >
                    <Search />
                  </IconButton>
                ),
              }}
            />
          </Box>

          {/* 内容过滤器 */}
          <Box sx={{ bgcolor: '#1E1E1E', p: 3, borderRadius: 2, border: '1px solid #4CAF50' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <Box sx={{ width: 8, height: 8, bgcolor: '#4CAF50', borderRadius: '50%', mr: 2 }} />
              <Typography variant="subtitle1" sx={{ color: '#4CAF50', fontWeight: 'bold' }}>
                Contents Filter
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', p: 1 }}>
              <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.7)', width: '120px' }}>
                Pricing Option
              </Typography>
              <Box sx={{ display: 'flex', gap: 4, flex: 1 }}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={filters.paid}
                      onChange={() => handleFilterChange('paid')}
                      name="paid"
                    />
                  }
                  label="Paid"
                  sx={{ color: 'rgba(255,255,255,0.7)' }}
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={filters.free}
                      onChange={() => handleFilterChange('free')}
                      name="free"
                    />
                  }
                  label="Free"
                  sx={{ color: 'rgba(255,255,255,0.7)' }}
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={filters.viewOnly}
                      onChange={() => handleFilterChange('viewOnly')}
                      name="viewOnly"
                    />
                  }
                  label="View Only"
                  sx={{ color: 'rgba(255,255,255,0.7)' }}
                />
              </Box>
              <Button
                variant="outlined"
                onClick={handleResetFilters}
                sx={{
                  color: 'rgba(255,255,255,0.7)',
                  borderColor: 'rgba(255,255,255,0.3)',
                  textTransform: 'uppercase',
                  fontWeight: 'bold',
                  minWidth: '80px',
                  '&:hover': {
                    borderColor: 'rgba(255,255,255,0.5)',
                    bgcolor: 'rgba(255,255,255,0.05)',
                  },
                }}
              >
                RESET
              </Button>
            </Box>
          </Box>
        </Box>

        {/* 内容列表 - 铺满整个屏幕 */}
        <Box sx={{ px: 4, mb: 6 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 4 }}>
              <Box sx={{ width: 8, height: 8, bgcolor: '#4CAF50', borderRadius: '50%', mr: 2 }} />
              <Typography variant="subtitle1" sx={{ color: '#4CAF50', fontWeight: 'bold' }}>
                Contents List
              </Typography>
            </Box>
            {displayedProducts.length > 0 || isLoading ? (
              <>
                {/* 显示已加载的产品 */}
                {displayedProducts.length > 0 && (
                  <Grid container spacing={4} sx={{ maxWidth: '1250px', mx: 'auto', justifyContent: 'center' }}>
                    {displayedProducts.map((product, index) => (
                      <Grid 
                        item 
                        xs={12} 
                        sm={6} 
                        md={4} 
                        lg={3} 
                        xl={3} 
                        key={product.id}
                        ref={index === displayedProducts.length - 1 ? lastProductRef : null}
                        sx={{
                          minWidth: 0, // 防止flex项目溢出
                          display: 'flex',
                          justifyContent: 'center'
                        }}
                      >
                        <Box sx={{ 
                          bgcolor: '#1E1E1E', 
                          borderRadius: 2, 
                          overflow: 'hidden', 
                          border: '1px solid rgba(255,255,255,0.1)', 
                          width: { xs: '90%', sm: 280 }, // 在xs屏幕上使用百分比宽度，其他屏幕使用固定宽度
                          maxWidth: '100%', // 确保在小屏幕上不会溢出
                        }}>
                      <Box sx={{ position: 'relative', height: 300, overflow: 'hidden' }}>
                        <img
                          src={product.imagePath}
                          alt={product.title}
                          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                        />
                        {/* 显示产品状态标签 */}
                        {product.isViewOnly && (
                          <Box sx={{ position: 'absolute', top: 10, left: 10, bgcolor: 'rgba(0,0,0,0.7)', color: '#fff', px: 2, py: 1, borderRadius: 2, fontSize: '0.75rem' }}>
                            View Only
                          </Box>
                        )}
                        {product.isPaid && (
                          <Box sx={{ position: 'absolute', top: 10, left: 10, bgcolor: '#FFD700', color: '#000', px: 2, py: 1, borderRadius: 2, fontSize: '0.75rem', fontWeight: 'bold' }}>
                            Paid
                          </Box>
                        )}
                        {product.isFree && (
                          <Box sx={{ position: 'absolute', top: 10, left: 10, bgcolor: '#4CAF50', color: '#fff', px: 2, py: 1, borderRadius: 2, fontSize: '0.75rem', fontWeight: 'bold' }}>
                            Free
                          </Box>
                        )}
                        {/* 右上角按钮组 */}
                        <Box sx={{ position: 'absolute', top: 10, right: 10, display: 'flex', gap: 2 }}>
                          <IconButton
                            sx={{
                              bgcolor: 'rgba(0,0,0,0.7)',
                              color: '#fff',
                              '&:hover': {
                                bgcolor: 'rgba(0,0,0,0.9)',
                              },
                            }}
                          >
                            <ShoppingCartIcon fontSize="small" />
                          </IconButton>
                          <IconButton
                            sx={{
                              bgcolor: 'rgba(0,0,0,0.7)',
                              color: '#fff',
                              '&:hover': {
                                bgcolor: 'rgba(0,0,0,0.9)',
                              },
                            }}
                          >
                            <FavoriteIcon fontSize="small" />
                          </IconButton>
                        </Box>
                      </Box>
                      <Box sx={{ p: 3 }}>
                        <Typography variant="subtitle2" sx={{ color: 'rgba(255,255,255,0.7)', mb: 1 }}>
                          {product.creator}
                        </Typography>
                        <Typography variant="h6" sx={{ color: '#fff', mb: 2 }}>
                          {product.title}
                        </Typography>
                        <Typography variant="body2" sx={{ color: product.price > 0 ? '#FFD700' : '#4CAF50', fontWeight: 'bold', fontSize: '1.1rem', mb: 1 }}>
                          {product.price > 0 ? `$${product.price.toFixed(2)}` : 'FREE'}
                        </Typography>
                        <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                          <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.5)' }}>
                            100+ views
                          </Typography>
                          <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.5)' }}>
                            • 25 likes
                          </Typography>
                        </Box>
                      </Box>
                    </Box>
                    </Grid>
                    ))}
                  </Grid>
                )}
                
                {/* 加载中显示骨架屏 */}
                {isLoading && (
                  <Grid container spacing={4} sx={{ maxWidth: '1250px', mx: 'auto', justifyContent: 'center', mt: 4 }}>
                    {Array.from({ length: 4 }).map((_, index) => (
                      <Grid 
                        item 
                        xs={12} 
                        sm={6} 
                        md={4} 
                        lg={3} 
                        xl={3} 
                        key={`skeleton-${index}`}
                        sx={{
                          minWidth: 0, 
                          display: 'flex',
                          justifyContent: 'center'
                        }}
                      >
                        <ProductSkeleton />
                      </Grid>
                    ))}
                  </Grid>
                )}
                
                {/* 没有更多产品时的提示 */}
                {!hasMore && displayedProducts.length > 0 && (
                  <Typography variant="body2" sx={{ textAlign: 'center', color: 'rgba(255,255,255,0.5)', py: 6 }}>
                    No more products to load
                  </Typography>
                )}
              </>
            ) : (
              <Typography variant="body1" sx={{ textAlign: 'center', color: 'rgba(255,255,255,0.5)', py: 8 }}>
                No products match your filters
              </Typography>
            )}
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default ProductsList;