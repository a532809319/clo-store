import React, { useState } from 'react';
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
  // 模拟数据
  // 模拟数据，添加额外字段以匹配参考图片样式
  const mockProducts =[
  {
    "id": "content-001",
    "creator": "Adam",
    "title": "Yellow green coat",
    "pricingOption": 0,
    "imagePath": "https://closetfrontrecruiting.blob.core.windows.net/images/thumbnail_1.jpeg",
    "price": 50
  },
  {
    "id": "content-002",
    "creator": "Benny",
    "title": "Brown Anorak",
    "pricingOption": 1,
    "imagePath": "https://closetfrontrecruiting.blob.core.windows.net/images/thumbnail_2.png",
    "price": 30
  },
  {
    "id": "content-003",
    "creator": "Catlin",
    "title": "Block shape mini bag",
    "pricingOption": 2,
    "imagePath": "https://closetfrontrecruiting.blob.core.windows.net/images/thumbnail_3.jpeg",
    "price": 15
  },
  {
    "id": "content-004",
    "creator": "Dan",
    "title": "Tartan mini dress",
    "pricingOption": 1,
    "imagePath": "https://closetfrontrecruiting.blob.core.windows.net/images/thumbnail_4.png",
    "price": 300
  },
  {
    "id": "content-005",
    "creator": "Emily",
    "title": "Pink training suit",
    "pricingOption": 2,
    "imagePath": "https://closetfrontrecruiting.blob.core.windows.net/images/thumbnail_5.png",
    "price": 200.5
  },
  {
    "id": "content-006",
    "creator": "Felix",
    "title": "Denim jump suit",
    "pricingOption": 1,
    "imagePath": "https://closetfrontrecruiting.blob.core.windows.net/images/thumbnail_6.png",
    "price": 30
  },
  {
    "id": "content-007",
    "creator": "Gina",
    "title": "Denim shirt",
    "pricingOption": 1,
    "imagePath": "https://closetfrontrecruiting.blob.core.windows.net/images/thumbnail_7.jpeg",
    "price": 100
  },
  {
    "id": "content-008",
    "creator": "Harry",
    "title": "Silk shirring dress",
    "pricingOption": 2,
    "imagePath": "https://closetfrontrecruiting.blob.core.windows.net/images/thumbnail_8.jpeg",
    "price": 50
  },
  {
    "id": "content-009",
    "creator": "Ikarus",
    "title": "Beige shirt with hat",
    "pricingOption": 2,
    "imagePath": "https://closetfrontrecruiting.blob.core.windows.net/images/thumbnail_9.jpeg",
    "price": 5
  },
  {
    "id": "content-010",
    "creator": "Jennifer",
    "title": "Red leather evening dress",
    "pricingOption": 0,
    "imagePath": "https://closetfrontrecruiting.blob.core.windows.net/images/thumbnail_10.png",
    "price": 10.5
  },
  {
    "id": "content-011",
    "creator": "Kiara",
    "title": "Runner pants",
    "pricingOption": 1,
    "imagePath": "https://closetfrontrecruiting.blob.core.windows.net/images/thumbnail_11.png",
    "price": 20
  },
  {
    "id": "content-012",
    "creator": "Lonnie",
    "title": "Futuristic garment",
    "pricingOption": 1,
    "imagePath": "https://closetfrontrecruiting.blob.core.windows.net/images/thumbnail_12.png",
    "price": 20
  },
  {
    "id": "content-013",
    "creator": "Marie",
    "title": "Silk dress",
    "pricingOption": 0,
    "imagePath": "https://closetfrontrecruiting.blob.core.windows.net/images/thumbnail_13.png",
    "price": 65
  },
  {
    "id": "content-014",
    "creator": "Nate",
    "title": "Swimsuit",
    "pricingOption": 1,
    "imagePath": "https://closetfrontrecruiting.blob.core.windows.net/images/thumbnail_14.png",
    "price": 100
  },
  {
    "id": "content-015",
    "creator": "Obama",
    "title": "Simple knit",
    "pricingOption": 1,
    "imagePath": "https://closetfrontrecruiting.blob.core.windows.net/images/thumbnail_15.jpeg",
    "price": 10
  },
  {
    "id": "content-016",
    "creator": "Pierre",
    "title": "Velvet blazer",
    "pricingOption": 1,
    "imagePath": "https://closetfrontrecruiting.blob.core.windows.net/images/thumbnail_16.png",
    "price": 70
  },
  {
    "id": "content-017",
    "creator": "Quinn",
    "title": "Red tweed jacket",
    "pricingOption": 2,
    "imagePath": "https://closetfrontrecruiting.blob.core.windows.net/images/thumbnail_17.png",
    "price": 1
  },
  {
    "id": "content-018",
    "creator": "Randy",
    "title": "Violet underwares",
    "pricingOption": 0,
    "imagePath": "https://closetfrontrecruiting.blob.core.windows.net/images/thumbnail_18.png",
    "price": 100.5
  },
  {
    "id": "content-019",
    "creator": "Suzie",
    "title": "Deep green wide pants",
    "pricingOption": 1,
    "imagePath": "https://closetfrontrecruiting.blob.core.windows.net/images/thumbnail_19.png",
    "price": 90
  },
  {
    "id": "content-020",
    "creator": "Tony",
    "title": "Floral pattern hat",
    "pricingOption": 2,
    "imagePath": "https://closetfrontrecruiting.blob.core.windows.net/images/thumbnail_20.png",
    "price": 100
  },
  {
    "id": "content-021",
    "creator": "Umar",
    "title": "Cargo pants",
    "pricingOption": 1,
    "imagePath": "https://closetfrontrecruiting.blob.core.windows.net/images/thumbnail_21.png",
    "price": 20
  },
  {
    "id": "content-022",
    "creator": "Vivian",
    "title": "Stadium jacket",
    "pricingOption": 1,
    "imagePath": "https://closetfrontrecruiting.blob.core.windows.net/images/thumbnail_22.png",
    "price": 45
  },
  {
    "id": "content-023",
    "creator": "Walter",
    "title": "Open neck dress",
    "pricingOption": 0,
    "imagePath": "https://closetfrontrecruiting.blob.core.windows.net/images/thumbnail_23.png",
    "price": 10
  },
  {
    "id": "content-024",
    "creator": "Xavier",
    "title": "Black leather costume",
    "pricingOption": 1,
    "imagePath": "https://closetfrontrecruiting.blob.core.windows.net/images/thumbnail_24.png",
    "price": 13
  },
  {
    "id": "content-025",
    "creator": "Yves",
    "title": "Pink cardigan",
    "pricingOption": 0,
    "imagePath": "https://closetfrontrecruiting.blob.core.windows.net/images/thumbnail_25.png",
    "price": 5
  },
  {
    "id": "content-026",
    "creator": "Zane",
    "title": "Polo style uniform",
    "pricingOption": 1,
    "imagePath": "https://closetfrontrecruiting.blob.core.windows.net/images/thumbnail_26.png",
    "price": 200
  },
  {
    "id": "content-027",
    "creator": "Adam",
    "title": "Grunge look",
    "pricingOption": 0,
    "imagePath": "https://closetfrontrecruiting.blob.core.windows.net/images/thumbnail_27.png",
    "price": 300
  },
  {
    "id": "content-028",
    "creator": "Catlin",
    "title": "White top",
    "pricingOption": 1,
    "imagePath": "https://closetfrontrecruiting.blob.core.windows.net/images/thumbnail_28.png",
    "price": 80
  },
  {
    "id": "content-029",
    "creator": "Catlin",
    "title": "White simple dress with jacket",
    "pricingOption": 2,
    "imagePath": "https://closetfrontrecruiting.blob.core.windows.net/images/thumbnail_29.png",
    "price": 13
  },
  {
    "id": "content-030",
    "creator": "Felix",
    "title": "Satin dress",
    "pricingOption": 1,
    "imagePath": "https://closetfrontrecruiting.blob.core.windows.net/images/thumbnail_30.png",
    "price": 1200.5
  },
  {
    "id": "content-031",
    "creator": "Vivian",
    "title": "Workware jacket",
    "pricingOption": 2,
    "imagePath": "https://closetfrontrecruiting.blob.core.windows.net/images/thumbnail_31.png",
    "price": 450
  },
  {
    "id": "content-032",
    "creator": "Zane",
    "title": "Denim mini dress2",
    "pricingOption": 1,
    "imagePath": "https://closetfrontrecruiting.blob.core.windows.net/images/thumbnail_32.png",
    "price": 30
  },
  {
    "id": "content-033",
    "creator": "John",
    "title": "Casual look",
    "pricingOption": 1,
    "imagePath": "https://closetfrontrecruiting.blob.core.windows.net/images/thumbnail_33.png",
    "price": 10
  },
  {
    "id": "content-034",
    "creator": "Haily",
    "title": "Yellow striped shirt",
    "pricingOption": 0,
    "imagePath": "https://closetfrontrecruiting.blob.core.windows.net/images/thumbnail_34.png",
    "price": 250
  },
  {
    "id": "content-035",
    "creator": "Dion",
    "title": "Argyle pattern top",
    "pricingOption": 0,
    "imagePath": "https://closetfrontrecruiting.blob.core.windows.net/images/thumbnail_35.png",
    "price": 90
  },
  {
    "id": "content-036",
    "creator": "Sean",
    "title": "Vivid orange jumpsuit",
    "pricingOption": 0,
    "imagePath": "https://closetfrontrecruiting.blob.core.windows.net/images/thumbnail_36.png",
    "price": 70
  },
  {
    "id": "content-037",
    "creator": "Jake",
    "title": "Underware",
    "pricingOption": 1,
    "imagePath": "https://closetfrontrecruiting.blob.core.windows.net/images/thumbnail_37.jpeg",
    "price": 33
  },
  {
    "id": "content-038",
    "creator": "Molly",
    "title": "Winter jacket",
    "pricingOption": 1,
    "imagePath": "https://closetfrontrecruiting.blob.core.windows.net/images/thumbnail_38.png",
    "price": 10
  },
  {
    "id": "content-039",
    "creator": "MJ",
    "title": "Double coat",
    "pricingOption": 0,
    "imagePath": "https://closetfrontrecruiting.blob.core.windows.net/images/thumbnail_39.jpeg",
    "price": 1050
  },
  {
    "id": "content-040",
    "creator": "Sam",
    "title": "Color pop dress",
    "pricingOption": 1,
    "imagePath": "https://closetfrontrecruiting.blob.core.windows.net/images/thumbnail_40.png",
    "price": 10000
  },
  {
    "id": "content-041",
    "creator": "Obama",
    "title": "Blue square neck dress",
    "pricingOption": 0,
    "imagePath": "https://closetfrontrecruiting.blob.core.windows.net/images/thumbnail_41.png",
    "price": 30
  },
  {
    "id": "content-042",
    "creator": "Pierre",
    "title": "Green coat",
    "pricingOption": 1,
    "imagePath": "https://closetfrontrecruiting.blob.core.windows.net/images/thumbnail_1.jpeg",
    "price": 50
  },
  {
    "id": "content-043",
    "creator": "Quinn",
    "title": "Anorak jacket",
    "pricingOption": 2,
    "imagePath": "https://closetfrontrecruiting.blob.core.windows.net/images/thumbnail_2.png",
    "price": 85
  },
  {
    "id": "content-044",
    "creator": "Randy",
    "title": "White mini clutch",
    "pricingOption": 2,
    "imagePath": "https://closetfrontrecruiting.blob.core.windows.net/images/thumbnail_3.jpeg",
    "price": 30
  },
  {
    "id": "content-045",
    "creator": "Rhonda",
    "title": "Red check pattern dress",
    "pricingOption": 1,
    "imagePath": "https://closetfrontrecruiting.blob.core.windows.net/images/thumbnail_4.png",
    "price": 250
  },
  {
    "id": "content-046",
    "creator": "Kiara",
    "title": "Gymware",
    "pricingOption": 2,
    "imagePath": "https://closetfrontrecruiting.blob.core.windows.net/images/thumbnail_5.png",
    "price": 100
  },
  {
    "id": "content-047",
    "creator": "Xavier",
    "title": "Denim suit",
    "pricingOption": 1,
    "imagePath": "https://closetfrontrecruiting.blob.core.windows.net/images/thumbnail_6.png",
    "price": 35
  },
  {
    "id": "content-048",
    "creator": "Pierre",
    "title": "Jean",
    "pricingOption": 1,
    "imagePath": "https://closetfrontrecruiting.blob.core.windows.net/images/thumbnail_7.jpeg",
    "price": 90
  },
  {
    "id": "content-049",
    "creator": "Wesley",
    "title": "Thigh-high white boots",
    "pricingOption": 0,
    "imagePath": "https://closetfrontrecruiting.blob.core.windows.net/images/thumbnail_8.jpeg",
    "price": 100
  },
  {
    "id": "content-050",
    "creator": "Riley",
    "title": "Pale denim hat",
    "pricingOption": 1,
    "imagePath": "https://closetfrontrecruiting.blob.core.windows.net/images/thumbnail_9.jpeg",
    "price": 115
  },
  {
    "id": "content-051",
    "creator": "Joe",
    "title": "Open neck evening garment",
    "pricingOption": 0,
    "imagePath": "https://closetfrontrecruiting.blob.core.windows.net/images/thumbnail_10.png",
    "price": 50
  },
  {
    "id": "content-052",
    "creator": "Adam",
    "title": "Gray leggings",
    "pricingOption": 1,
    "imagePath": "https://closetfrontrecruiting.blob.core.windows.net/images/thumbnail_11.png",
    "price": 70
  }
]

  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    paid: false,
    free: false,
    viewOnly: false
  });

  // 将pricingOption转换为与原UI兼容的属性
  const enhancedProducts = mockProducts.map(product => {
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
    
    return {
      ...product,
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
  };

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
            {filteredProducts.length > 0 ? (
              <Grid container spacing={4} sx={{ maxWidth: '1250px', mx: 'auto', justifyContent: 'center' }}>
                {filteredProducts.map(product => (
                  <Grid 
                    item 
                    xs={12} 
                    sm={6} 
                    md={4} 
                    lg={3} 
                    xl={3} 
                    key={product.id}
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
                            {product.views} views
                          </Typography>
                          <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.5)' }}>
                            • {product.favorites} likes
                          </Typography>
                        </Box>
                      </Box>
                    </Box>
                  </Grid>
                ))}
              </Grid>
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