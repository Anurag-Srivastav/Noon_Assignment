# Noon E-Commerce Mobile App

A feature-rich React Native e-commerce application built with TypeScript, following Clean Architecture principles and modern best practices.

## 🏗️ Architecture Overview

This project follows **Clean Architecture** principles with a clear separation of concerns across three main layers:

```
src/
├── components/          # Presentation Layer (UI Components)
├── screens/            # Presentation Layer (Screen Components)
├── hooks/              # Business Logic Layer (Custom Hooks)
├── domain/             # Domain Layer (Business Rules)
├── store/              # State Management (Redux Toolkit)
├── data/               # Data Layer (Mock Data)
├── navigation/         # App Navigation
├── utils/              # Utility Functions
└── constants/          # App-wide Constants
```

### Layer Responsibilities

#### 1. **Presentation Layer** (`components/` & `screens/`)
- Pure UI components with minimal logic
- Consumes data from custom hooks
- Uses centralized constants for colors, labels, and dimensions
- Optimized with `React.memo` for performance

#### 2. **Business Logic Layer** (`hooks/`)
- Custom hooks encapsulate all business logic
- Handle API calls, state management, and side effects
- Provide clean interfaces to UI components
- Examples: `useSearch`, `useCartItem`, `useDebounce`, `useShimmer`

#### 3. **Domain Layer** (`domain/`)
- Pure business logic functions
- No dependencies on React or UI
- API simulation with realistic delays
- Error handling and validation

#### 4. **Data Layer** (`data/` & `store/`)
- Mock data for products, banners, categories
- Redux store for global state (cart, search cache)
- Type-safe interfaces and models

---

## 🎯 Key Features

### 1. **Clean Code Architecture**

#### Constants Centralization
All magic strings, colors, dimensions, and labels are centralized in `src/constants/index.ts`:

```typescript
export const COLORS = {
  BLACK: '#000',
  WHITE: '#fff',
  // ... 30+ color constants
};

export const LABELS = {
  ADD_TO_CART: 'Add to Cart',
  SEARCH_RESULTS: 'Search Results',
  // ... 50+ label constants
};

export const SCREENS = {
  HOME: 'Home',
  CART: 'Cart',
  // ... screen name constants
};
```

**Benefits:**
- Single source of truth
- Easy theming and localization
- Type-safe constant usage
- No hardcoded strings in components

#### Component Optimization
All components are wrapped with `React.memo` for optimal performance:

```typescript
// 13 components optimized:
- CartItem, CartItemGrid, CategoryGridItem
- ConfirmationIndicator, CustomButton, CustomHeader
- Image, Tag, Title, StarRating
- OrderSummary, BannerCarousel, SearchBar
```

#### Responsive Design
Custom dimension utilities for responsive layouts:

```typescript
import { vw, vh } from '../utils/dimensions';

// Usage
styles = StyleSheet.create({
  container: {
    width: vw(100),  // 100% of viewport width
    height: vh(50),  // 50% of viewport height
  }
});
```

---

## 🔧 Custom Hooks

### 1. **useSearch** - Search with LFU Cache
**Location:** `src/hooks/useSearch.ts`

**Purpose:** Provides intelligent search functionality with Least Frequently Used (LFU) caching.

**Features:**
- LFU cache implementation for search results
- Automatic cache invalidation
- Recent search history management
- Normalized query handling

**API:**
```typescript
const {
  search,              // Search function
  recentSearches,      // Recent search queries
  clearRecentSearches  // Clear history
} = useSearch();
```

**Cache Strategy:**
```
1. User searches for "laptop"
2. Check LFU cache for "laptop"
3. If CACHE HIT:
   - Return cached results immediately
   - Increment frequency count
   - Add to recent searches
4. If CACHE MISS:
   - Call domain layer search
   - Cache results with frequency = 1
   - Add to recent searches
```

**LFU Implementation:**
```typescript
// Cache structure
cache = {
  "laptop": {
    value: [...products],
    freq: 5  // Accessed 5 times
  },
  "phone": {
    value: [...products],
    freq: 3  // Accessed 3 times
  }
}

// When cache is full, evict lowest frequency item
```

### 2. **useCartItem** - Cart Operations
**Location:** `src/hooks/useCartItem.ts`

**Purpose:** Manages individual product cart operations.

**API:**
```typescript
const {
  quantity,    // Current quantity in cart
  addToCart,   // Add product to cart
  increment,   // Increase quantity
  decrement,   // Decrease quantity
  removeFromCart  // Remove from cart
} = useCartItem(product);
```

**Features:**
- Optimistic UI updates
- Redux state synchronization
- Automatic total calculation

### 3. **useDebounce** - Input Debouncing
**Location:** `src/hooks/useDebounce.ts`

**Purpose:** Debounces rapid input changes to reduce unnecessary operations.

**API:**
```typescript
const debouncedValue = useDebounce(value, 500); // 500ms delay
```

**Use Case:**
```typescript
// Search input
const [query, setQuery] = useState('');
const debouncedQuery = useDebounce(query, 500);

// Search only triggers after user stops typing for 500ms
useEffect(() => {
  performSearch(debouncedQuery);
}, [debouncedQuery]);
```

### 4. **useShimmer** - Loading States
**Location:** `src/hooks/useShimmer.ts`

**Purpose:** Provides elegant loading skeletons for different screens.

**API:**
```typescript
const { renderShimmer } = useShimmer(SCREENS.HOME);
```

**Features:**
- Screen-specific shimmer layouts
- Smooth animations
- Realistic loading experience

---

## 🌐 API Simulation

### Realistic API Calls
All API calls are simulated with realistic delays and error scenarios in `src/domain/index.ts`:

#### 1. **Product Search**
```typescript
export const searchProducts = async (
  query: string,
  products: Product[]
): Promise<Product[]> => {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 300));
  
  // Simulate 5% error rate
  if (Math.random() < 0.05) {
    throw new Error('Search service unavailable');
  }
  
  // Filter products
  return products.filter(p => 
    p.name.toLowerCase().includes(query.toLowerCase())
  );
};
```

#### 2. **Payment Processing**
```typescript
export const processPayment = async (
  amount: number,
  cardId: string
): Promise<PaymentResult> => {
  // Simulate 2-3 second payment processing
  await new Promise(resolve => 
    setTimeout(resolve, 2000 + Math.random() * 1000)
  );
  
  // Simulate 20% failure rate
  const success = Math.random() > 0.2;
  
  return {
    success,
    transactionId: success ? generateId() : null,
    message: success 
      ? 'Payment successful' 
      : 'Payment declined by bank'
  };
};
```

#### 3. **Product Fetching**
```typescript
export const fetchProducts = async (): Promise<Product[]> => {
  // Simulate initial load delay
  await new Promise(resolve => setTimeout(resolve, 1500));
  
  return PRODUCTS.products;
};
```

### Error Handling Scenarios

#### Success Flow
```
User Action → Domain Layer (Success) → Update Redux Store → UI Updates
```

#### Failure Flow
```
User Action → Domain Layer (Error) → Show Error Message → Retry Option
```

**Example: Payment Processing**
```typescript
// Success Scenario (80% chance)
{
  success: true,
  transactionId: "TXN123456",
  message: "Payment successful"
}
→ Navigate to Confirmation Screen
→ Show success indicator
→ Clear cart

// Failure Scenario (20% chance)
{
  success: false,
  transactionId: null,
  message: "Insufficient funds"
}
→ Show error alert
→ Keep user on payment screen
→ Allow retry
```

---

## 🧠 LFU Cache Implementation

### Overview
Least Frequently Used (LFU) cache implemented in Redux for search results optimization.

**Location:** `src/store/search/searchSlice.ts`

### Cache Structure
```typescript
interface CacheNode<T> {
  value: T;      // Cached data
  freq: number;  // Access frequency
}

interface SearchState {
  cache: Record<string, CacheNode<Product[]>>;
  recent: string[];
  cacheSize: number;
  maxCacheSize: number;
}
```

### Cache Operations

#### 1. **Cache Hit (Frequent Access)**
```typescript
// Query: "laptop" (freq: 3)
getCachedResults('laptop')
→ Increment frequency to 4
→ Return cached products
→ O(1) time complexity
```

#### 2. **Cache Miss (New Query)**
```typescript
// Query: "headphones" (not in cache)
cacheSearchResults({ query: 'headphones', results: [...] })
→ Add to cache with freq: 1
→ If cache full, evict lowest frequency item
→ O(n) time complexity for eviction
```

#### 3. **Cache Eviction (Full Cache)**
```typescript
// Max cache size: 50 queries
// Current cache: 50/50
// New query: "tablet"

1. Find lowest frequency item
   cache = { "laptop": 10, "mouse": 2, "keyboard": 5 }
   → "mouse" has lowest freq (2)

2. Remove "mouse" from cache

3. Add "tablet" with freq: 1
```

### LFU Benefits
- **Fast lookups:** O(1) for cache hits
- **Memory efficient:** Keeps most frequently accessed data
- **Better than LRU:** Prioritizes frequency over recency
- **Realistic caching:** Mimics real-world CDN behavior

### Cache Metrics
```typescript
// Logged in console
console.log('Cache HIT for "laptop" (freq: 5)');
console.log('Cache MISS for "headphones" - filtering products');
console.log('Cache evicted: "mouse" (freq: 2)');
```

---

## 📱 Screen Flows

### 1. **Home Screen**
```
Load → Show Shimmer (2s) → Display Products
                        → Banner Carousel
                        → Category Grid
                        → Product Carousels
```

### 2. **Search Flow**
```
User Types Query
→ Debounce (500ms)
→ Check LFU Cache
  ├─ Cache Hit → Instant Results
  └─ Cache Miss → Search Products (300ms) → Cache Results
→ Display Results
→ Add to Recent Searches
```

### 3. **Cart Flow**
```
Browse Products
→ Add to Cart (Optimistic Update)
→ View Cart
→ Review Order
→ Process Payment (2-3s)
  ├─ Success (80%) → Confirmation Screen
  └─ Failure (20%) → Error Alert → Retry
```

---

## 🎨 Design System

### Color Palette
```typescript
PRIMARY: Black (#000) and White (#fff)
GRAYS: #333, #666, #ccc, #e0e0e0, #f0f0f0
BACKGROUNDS: #f7f7f8, #f5f5f5, #f2f2f2
SUCCESS: #16a34a with #e8f9ee background
WARNING: #ffc107 with #fff3cd background
```

### Typography
```typescript
HEADINGS: 18-24px, weight: 600-700
BODY: 14-16px, weight: 400-600
SMALL: 12-13px, weight: 400-500
```

### Spacing System
```typescript
SMALL: vh(6) - vh(8)
MEDIUM: vh(12) - vh(16)
LARGE: vh(20) - vh(24)
```

---

## 🚀 Performance Optimizations

### 1. **Component Memoization**
- 13+ components wrapped with `React.memo`
- Prevents unnecessary re-renders
- Optimized prop comparison

### 2. **Callback Memoization**
```typescript
const handlePress = useCallback(() => {
  // Handler logic
}, [dependencies]);
```

### 3. **Dimension Constants**
```typescript
// Shimmer loader constants extracted
export const SHIMMER_DIMENSIONS = {
  HEIGHT_SM: 14,
  HEIGHT_MD: 16,
  BORDER_RADIUS_LG: 8,
  // ... reusable dimensions
};
```

### 4. **Lazy Loading**
- Images loaded on-demand with FastImage
- Shimmer skeletons during load
- Optimistic UI updates

---

## 🧪 Testing Scenarios

### Success Scenarios
1. **Search:** Type "laptop" → See instant results (cache hit)
2. **Cart:** Add product → See quantity update immediately
3. **Payment:** Complete purchase → Navigate to confirmation
4. **Navigation:** Browse seamlessly between screens

### Failure Scenarios
1. **Search Error (5%):** Shows error message with retry
2. **Payment Failure (20%):** Error alert with retry option
3. **Network Error:** Graceful error handling
4. **Empty States:** "No results found" messages

### Edge Cases
1. **Empty Cart:** Shows empty state message
2. **Zero Search Results:** Helpful "No products found" message
3. **Rapid Input:** Debounced to prevent excessive API calls
4. **Cache Full:** LFU eviction maintains performance

---

## 📦 Project Structure

```
src/
├── components/
│   ├── BannerCarousel.tsx      # Auto-scrolling banners
│   ├── CartItem.tsx            # Individual cart item
│   ├── CustomButton.tsx        # Reusable button component
│   ├── CustomHeader.tsx        # App header with navigation
│   ├── ProductCard.tsx         # Product display card
│   ├── SearchBar.tsx           # Search input component
│   ├── ShimmerLoader.tsx       # Loading skeletons
│   └── shimmerConstants.ts     # Shimmer dimensions
│
├── screens/
│   ├── HomeScreen.tsx          # Main landing screen
│   ├── SearchScreen.tsx        # Search with LFU cache
│   ├── ProductDetailsScreen.tsx # Product details view
│   ├── CartScreen.tsx          # Shopping cart
│   ├── CartReviewScreen.tsx    # Order review
│   ├── PaymentProcessingScreen.tsx # Payment simulation
│   └── ConfirmationScreen.tsx  # Order confirmation
│
├── hooks/
│   ├── useSearch.ts            # Search with LFU cache
│   ├── useCartItem.ts          # Cart operations
│   ├── useDebounce.ts          # Input debouncing
│   └── useShimmer.ts           # Loading states
│
├── domain/
│   └── index.ts                # API simulation layer
│
├── store/
│   ├── store.ts                # Redux store configuration
│   ├── cart/
│   │   └── cartSlice.ts        # Cart state management
│   └── search/
│       └── searchSlice.ts      # Search cache with LFU
│
├── data/
│   └── products.ts             # Mock product data
│
├── constants/
│   └── index.ts                # Centralized constants
│
└── utils/
    └── dimensions.ts           # Responsive utilities

```

---

## 🛠️ Technologies Used

- **React Native** - Mobile framework
- **TypeScript** - Type safety
- **Redux Toolkit** - State management
- **React Navigation** - Screen navigation
- **React Native Vector Icons** - Icon library
- **Fast Image** - Optimized image loading

---

## 💡 Best Practices Implemented

### 1. **Type Safety**
```typescript
// Strict typing everywhere
interface Product {
  id: string;
  name: string;
  price: number;
  // ... full type definitions
}
```

### 2. **Error Boundaries**
```typescript
try {
  await processPayment();
} catch (error) {
  console.error('Payment failed:', error);
  showErrorAlert();
}
```

### 3. **Clean Imports**
```typescript
// Absolute imports with path mapping
import { COLORS } from '../constants';
import { useSearch } from '../hooks/useSearch';
```

### 4. **Consistent Naming**
```typescript
// Components: PascalCase
export default function ProductCard() {}

// Hooks: camelCase with 'use' prefix
export const useSearch = () => {}

// Constants: UPPER_SNAKE_CASE
export const COLORS = { PRIMARY: '#000' }
```

---

## 🔄 State Management Flow

```
User Action
    ↓
Custom Hook (Business Logic)
    ↓
Domain Layer (API Simulation)
    ↓
Redux Action Dispatch
    ↓
Redux Reducer Updates State
    ↓
Component Re-renders with New Data
```

---

## 📝 Code Quality

- ✅ **Clean Architecture** - Clear separation of concerns
- ✅ **TypeScript** - 100% type coverage
- ✅ **Custom Hooks** - Reusable business logic
- ✅ **Constants** - Zero hardcoded values
- ✅ **Performance** - Optimized with React.memo
- ✅ **Responsive** - Adaptive layouts
- ✅ **Error Handling** - Comprehensive error scenarios
- ✅ **Loading States** - Shimmer skeletons
- ✅ **Caching** - LFU implementation

---

## 🎓 Learning Outcomes

This project demonstrates:

1. **Clean Architecture** principles in React Native
2. **Advanced React patterns** (hooks, memoization, optimization)
3. **LFU cache implementation** for performance
4. **API simulation** with realistic scenarios
5. **TypeScript best practices** for type safety
6. **State management** with Redux Toolkit
7. **Responsive design** with custom utilities
8. **Error handling** and edge cases
9. **Performance optimization** techniques
10. **Professional code organization** and structure

---

# Getting Started

> **Note**: Make sure you have completed the [Set Up Your Environment](https://reactnative.dev/docs/set-up-your-environment) guide before proceeding.

## Step 1: Start Metro

First, you will need to run **Metro**, the JavaScript build tool for React Native.

To start the Metro dev server, run the following command from the root of your React Native project:

```sh
# Using npm
npm start

# OR using Yarn
yarn start
```

## Step 2: Build and run your app

With Metro running, open a new terminal window/pane from the root of your React Native project, and use one of the following commands to build and run your Android or iOS app:

### Android

```sh
# Using npm
npm run android

# OR using Yarn
yarn android
```

### iOS

For iOS, remember to install CocoaPods dependencies (this only needs to be run on first clone or after updating native deps).

The first time you create a new project, run the Ruby bundler to install CocoaPods itself:

```sh
bundle install
```

Then, and every time you update your native dependencies, run:

```sh
bundle exec pod install
```

For more information, please visit [CocoaPods Getting Started guide](https://guides.cocoapods.org/using/getting-started.html).

```sh
# Using npm
npm run ios

# OR using Yarn
yarn ios
```

If everything is set up correctly, you should see your new app running in the Android Emulator, iOS Simulator, or your connected device.

This is one way to run your app — you can also build it directly from Android Studio or Xcode.

## Step 3: Modify your app

Now that you have successfully run the app, let's make changes!

Open `App.tsx` in your text editor of choice and make some changes. When you save, your app will automatically update and reflect these changes — this is powered by [Fast Refresh](https://reactnative.dev/docs/fast-refresh).

When you want to forcefully reload, for example to reset the state of your app, you can perform a full reload:

- **Android**: Press the <kbd>R</kbd> key twice or select **"Reload"** from the **Dev Menu**, accessed via <kbd>Ctrl</kbd> + <kbd>M</kbd> (Windows/Linux) or <kbd>Cmd ⌘</kbd> + <kbd>M</kbd> (macOS).
- **iOS**: Press <kbd>R</kbd> in iOS Simulator.

## Congratulations! :tada:

You've successfully run and modified your React Native App. :partying_face:

### Now what?

- If you want to add this new React Native code to an existing application, check out the [Integration guide](https://reactnative.dev/docs/integration-with-existing-apps).
- If you're curious to learn more about React Native, check out the [docs](https://reactnative.dev/docs/getting-started).

# Troubleshooting

If you're having issues getting the above steps to work, see the [Troubleshooting](https://reactnative.dev/docs/troubleshooting) page.

# Learn More

To learn more about React Native, take a look at the following resources:

- [React Native Website](https://reactnative.dev) - learn more about React Native.
- [Getting Started](https://reactnative.dev/docs/environment-setup) - an **overview** of React Native and how setup your environment.
- [Learn the Basics](https://reactnative.dev/docs/getting-started) - a **guided tour** of the React Native **basics**.
- [Blog](https://reactnative.dev/blog) - read the latest official React Native **Blog** posts.
- [`@facebook/react-native`](https://github.com/facebook/react-native) - the Open Source; GitHub **repository** for React Native.
