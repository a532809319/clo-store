// 引入必要的测试工具
import '@testing-library/jest-dom';

// 全局模拟fetch和其他浏览器API
window.fetch = jest.fn();

// 简单模拟IntersectionObserver
class MockIntersectionObserver {
  observe = jest.fn();
  unobserve = jest.fn();
  disconnect = jest.fn();
}

window.IntersectionObserver = MockIntersectionObserver;

// 为了测试目的，提供简单的URL参数模拟
let mockSearchParams = new URLSearchParams();

global.mockUrlParams = {
  set: (key, value) => {
    mockSearchParams.set(key, value);
  },
  get: (key) => {
    return mockSearchParams.get(key);
  },
  delete: (key) => {
    mockSearchParams.delete(key);
  },
  toString: () => {
    return mockSearchParams.toString();
  },
  clear: () => {
    mockSearchParams = new URLSearchParams();
  }
};

// 提供Redux store的模拟
global.mockStore = {
  products: {
    items: [],
    loading: false,
    error: null
  }
};

// 保存原始的setTimeout和clearTimeout用于某些测试场景
const originalSetTimeout = global.setTimeout;
const originalClearTimeout = global.clearTimeout;

// 不覆盖setTimeout和clearTimeout，让React Testing Library可以正常工作
// 但记录调用以支持测试断言
const timeoutCalls = [];
const clearTimeoutCalls = [];

global.mockSetTimeoutCalls = timeoutCalls;
global.mockClearTimeoutCalls = clearTimeoutCalls;

// 如果你需要在特定测试中模拟setTimeout，可以使用Jest的spyOn
// 例如: jest.spyOn(global, 'setTimeout').mockImplementation(yourMock)