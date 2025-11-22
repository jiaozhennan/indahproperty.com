# 太平洋花园房产项目 - 代码说明、部署指南与WordPress 6.8.3对接详细教程

## 一、代码说明

### 项目结构
本项目采用现代化的React + TypeScript架构，基于Vite构建，主要包含以下模块：

1. **核心组件**
   - `Header`: 响应式导航栏，支持多语言切换和移动端适配
   - `Footer`: 页脚组件，包含网站导航和联系方式
   - `Hero`: 主页英雄区域，实现了自动轮播功能
   - `PropertyShowcase`: 房产展示组件，支持切换查看不同类型房产
   - `FeaturesSection`: 项目特色和最新资讯展示
   - `AboutSection`: 关于我们和地图位置信息
   - `InquiryForm`: 联系咨询表单，带有表单验证功能

2. **页面组件**
   - `Home`: 主页，整合所有核心组件
   - `NewsList`: 新闻列表页面，支持分类筛选和搜索
   - `NewsDetail`: 新闻详情页面
   - `Projects`: 房产项目列表页面
   - `Type5`, `Type6`, `Type8`: 不同类型房产的详情页面

3. **工具和上下文**
   - `LanguageContext`: 多语言支持上下文
   - `useTheme`: 主题切换钩子
   - 多语言翻译文件 (`zh.ts`, `en.ts`, `id.ts`)
   - 工具函数库 (`utils.ts`)

### 技术特性

1. **性能优化**
   - 使用React.memo避免不必要的重渲染
   - 懒加载CSS和字体资源
   - 实现防抖和节流函数，优化用户交互
   - 预加载关键资源和下一个可能访问的页面

2. **用户体验优化**
   - 响应式设计，支持移动端和桌面端
   - 多语言支持（中文、英文、印尼文）
   - 平滑滚动和页面过渡动画
   - 表单验证和即时反馈
   - 使用Toast组件显示操作反馈

3. **代码质量**
   - TypeScript类型安全
   - 组件化设计，提高代码复用性
   - 清晰的文件结构和命名规范
   - 完整的错误处理和数据验证

## 二、部署指南

### 前提条件
- Node.js (v18.0.0+)
- pnpm (v7.0+)
- Git
- WordPress网站（用于内容管理和API提供）

### 步骤1：准备GitHub仓库
1. 在GitHub上创建一个新的仓库
2. 将本地项目推送到这个GitHub仓库

### 步骤2：修改配置文件（如果需要）

本项目已经配置为使用自定义域名 `bagusnya.com`，如果需要修改为其他域名：

1. 修改 `package.json` 中的 `homepage` 字段
2. 修改 `CNAME` 文件中的域名
3. 确保 `src/main.tsx` 中的 `HashRouter` basename 配置正确

### 步骤3：配置WordPress后台（针对WordPress 6.8.3版本优化）
1. 确保您的WordPress网站已安装WordPress 6.8.3版本并正常运行
2. 安装并启用以下推荐插件：
   - WordPress REST API (已内置在WordPress 6.8.3中，确保启用)
   - JWT Authentication for WP REST API (用于API认证，确保插件兼容WordPress 6.8.3)
   - Advanced Custom Fields (v6.0+，兼容WordPress 6.8.3的版本)
   - CORS Support (解决跨域问题，推荐使用"WP CORS"或"Enable CORS"插件的最新版本)
   - REST API Toolbox (WordPress 6.8.3推荐的API增强工具)

3. 配置WordPress 6.8.3的API设置:
   - 在wp-config.php中添加以下配置以优化API性能和安全性：
   ```php
   // JWT认证配置
   define('JWT_AUTH_SECRET_KEY', 'your-secret-key');
   define('JWT_AUTH_CORS_ENABLE', true);
   
   // WordPress 6.8.3特定优化
   define('REST_REQUEST', true);
   define('WP_REST_BLOCKS_ENABLED', true);
   define('WP_DISABLE_FATAL_ERROR_HANDLER', false); // 保持启用错误处理
   
   // 增加API请求限制以适应大型项目
   define('WP_MEMORY_LIMIT', '256M');
   ```

4. 创建所需的自定义内容类型：
   - 新闻 (News)
   - 房产项目 (Properties)

### 步骤4：安装依赖并构建项目
```bash
# 安装项目依赖
pnpm install

# 添加WordPress API集成所需的依赖
pnpm add axios
```

### 步骤5：集成WordPress API
创建 `src/utils/wordpress-api.ts` 文件（针对WordPress 6.8.3优化）：

```typescript
import axios from 'axios';

// WordPress API基础URL - WordPress 6.8.3支持的最新API端点
const API_BASE_URL = 'https://your-wordpress-site.com/wp-json/wp/v2';
```

// 创建axios实例
const wpApi = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// 认证函数 - 适配WordPress 6.8.3的JWT认证流程
export const authenticate = async (username: string, password: string) => {
  try {
    // 注意：WordPress 6.8.3的JWT插件可能使用不同的端点路径，根据实际安装的插件调整
    const response = await axios.post(
      `${API_BASE_URL}/jwt-auth/v1/token`,
      { username, password },
      {
        headers: {
          'Content-Type': 'application/json',
          'X-WP-Nonce': 'YOUR_NONCE_VALUE' // WordPress 6.8.3推荐添加nonce值增强安全性
        }
      }
    );
    if (response.data.token) {
      localStorage.setItem('wp_token', response.data.token);
      wpApi.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`;
      
      // WordPress 6.8.3的token有效期管理
      const expiryTime = Date.now() + (response.data.expires_in || 3600000); // 默认1小时
      localStorage.setItem('wp_token_expiry', expiryTime.toString());
    }
    return response.data;
  } catch (error) {
    console.error('WordPress authentication failed:', error);
    throw error;
  }
};

// 新闻相关API - 优化WordPress 6.8.3的查询性能
export const fetchNews = async (page: number = 1, perPage: number = 10) => {
  try {
    const response = await wpApi.get('/posts', {
      params: {
        page,
        per_page: perPage,
        categories: 1, // 假设1是新闻分类的ID
        _embed: true,
        // WordPress 6.8.3支持的性能优化参数
        _fields: 'id,title,content,excerpt,date,featured_media,categories',
        orderby: 'date',
        order: 'desc'
      },
    });
    return response.data;
  } catch (error) {
    console.error('Failed to fetch news:', error);
    throw error;
  }
};

export const fetchNewsById = async (id: number) => {
  try {
    const response = await wpApi.get(`/posts/${id}`, {
      params: { _embed: true },
    });
    return response.data;
  } catch (error) {
    console.error('Failed to fetch news by ID:', error);
    throw error;
  }
};

// 房产项目相关API - 适配WordPress 6.8.3的自定义post类型
export const fetchProperties = async (page: number = 1, perPage: number = 10) => {
  try {
    // 注意：WordPress 6.8.3的自定义post类型需要正确注册REST API支持
    const response = await wpApi.get('/properties', {
      params: {
        page,
        per_page: perPage,
        _embed: true,
        // WordPress 6.8.3支持的高级查询参数
        _fields: 'id,title,content,excerpt,date,featured_media,meta,acf',
        orderby: 'date',
        order: 'desc'
      },
    });
    return response.data;
  } catch (error) {
    console.error('Failed to fetch properties:', error);
    throw error;
  }
};

export const fetchPropertyById = async (id: number) => {
  try {
    const response = await wpApi.get(`/properties/${id}`, {
      params: { _embed: true },
    });
    return response.data;
  } catch (error) {
    console.error('Failed to fetch property by ID:', error);
    throw error;
  }
};

// 提交表单数据到WordPress - 支持Contact Form 7与WordPress 6.8.3兼容版本
export const submitInquiryForm = async (formData: any) => {
  try {
    // 注意：确保Contact Form 7插件版本与WordPress 6.8.3兼容
    const response = await wpApi.post('/contact-form-7/v1/contact-forms/1/feedback', formData, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded' // WordPress 6.8.3的CF7推荐格式
      }
    });
    return response.data;
  } catch (error) {
    console.error('Failed to submit inquiry form:', error);
    throw error;
  }
};

export default wpApi;

### 步骤6：修改现有组件以使用WordPress API

1. 更新 `NewsList.tsx` 和 `NewsDetail.tsx` 以使用 `fetchNews` 和 `fetchNewsById` 函数
2. 更新 `Projects.tsx` 和房产详情页面以使用 `fetchProperties` 和 `fetchPropertyById` 函数
3. 更新 `InquiryForm.tsx` 以使用 `submitInquiryForm` 函数

### 步骤7：部署项目

有两种部署方式：

#### 手动部署
```bash
# 构建项目
pnpm run build

# 部署到GitHub Pages
pnpm run deploy
```

#### 自动部署（推荐）
项目已配置 GitHub Actions 自动部署，当您将代码推送到主分支时，系统会自动执行构建和部署操作。

### 步骤8：验证部署
部署完成后，访问您的域名：`https://bagusnya.com` 或 GitHub Pages 默认域名。

## 三、与WordPress后台对接的最佳实践

### 1. 内容同步策略

- **实时获取**：对于新闻、房产项目等动态内容，使用WordPress REST API实时获取
- **缓存机制**：实现本地缓存策略，减少API请求频率
  ```typescript
  // 示例缓存函数
  export const cacheData = (key: string, data: any, ttl: number = 3600000) => {
    const cacheItem = {
      data,
      timestamp: Date.now(),
      ttl,
    };
    localStorage.setItem(key, JSON.stringify(cacheItem));
  };

  export const getCachedData = (key: string) => {
    const item = localStorage.getItem(key);
    if (!item) return null;
    
    const cacheItem = JSON.parse(item);
    if (Date.now() - cacheItem.timestamp > cacheItem.ttl) {
      localStorage.removeItem(key);
      return null;
    }
    
    return cacheItem.data;
  };
  ```

### 2. 认证与安全

- 使用JWT token进行API认证
- 实现适当的错误处理和重试机制
- 添加请求超时和加载状态管理

### 3. 多语言内容处理

- 在WordPress中使用WPML或Polylang插件管理多语言内容
- 在API调用中添加语言参数
  ```typescript
  export const fetchNewsWithLanguage = async (page: number = 1, perPage: number = 10, lang: string = 'zh') => {
    try {
      const response = await wpApi.get('/posts', {
        params: {
          page,
          per_page: perPage,
          categories: 1,
          lang, // 语言参数
          _embed: true,
        },
      });
      return response.data;
    } catch (error) {
      console.error('Failed to fetch news:', error);
      throw error;
    }
  };
  ```

### 4. 图片处理

- 使用WordPress媒体库存储和管理图片
- 在前端使用适当的图片优化策略，如懒加载、响应式图片

### 5. 常见问题与解决方案

1. **跨域问题**
   - 确保WordPress安装了CORS插件并正确配置
    - 或在WordPress 6.8.3主题的functions.php中添加优化后的CORS代码：
    ```php
    // WordPress 6.8.3优化的CORS配置
    function add_cors_http_header() {
      // 设置允许的源
      $origin = get_http_origin();
      $allowed_origins = array(
        'https://bagusnya.com',
        'http://localhost:3000'
      );
      
      if (in_array($origin, $allowed_origins)) {
        header("Access-Control-Allow-Origin: $origin");
        header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
        header("Access-Control-Allow-Headers: Content-Type, Authorization, X-WP-Nonce");
        header("Access-Control-Allow-Credentials: true");
        
        // 处理预检请求
        if ('OPTIONS' === $_SERVER['REQUEST_METHOD']) {
          status_header(200);
          exit();
        }
      }
    }
    add_action('init', 'add_cors_http_header');
    
    // 为WordPress 6.8.3 REST API添加额外的安全头
    function add_security_headers_to_rest_api($response, $handler, $request) {
      $response->header('X-Content-Type-Options', 'nosniff');
      $response->header('X-Frame-Options', 'SAMEORIGIN');
      $response->header('X-XSS-Protection', '1; mode=block');
      return $response;
    }
    add_filter('rest_pre_serve_request', 'add_security_headers_to_rest_api', 10, 3);
    ```

2. **认证失败**
   - 检查WordPress 6.8.3的JWT插件是否正确配置
   - 确保用户凭证有效并具有适当的REST API权限
   - 检查WordPress 6.8.3的用户角色和权限设置
   - 检查token是否过期，实现自动刷新机制

3. **API请求速度慢**
   - 实现本地缓存
   - 优化WordPress服务器性能
   - 考虑使用CDN加速静态资源

4. **数据结构不匹配**
   - 在WordPress中使用ACF创建与前端匹配的自定义字段
   - 在前端实现数据转换函数，将WordPress API响应转换为应用程序所需的格式

## 四、WordPress 6.8.3小白式详细对接教程

本章节为初学者提供了一个详细、易懂的WordPress 6.8.3对接教程，从基础设置到前端集成的每个步骤都有清晰说明。

### 1. 前提条件

在开始之前，请确保您已经：
- 搭建好WordPress 6.8.3网站（可以是本地或在线主机）
- 安装了Node.js和pnpm（如不清楚，请参考第二章部署指南）
- 已下载本项目的代码

### 2. WordPress后台设置（非常重要）

#### 步骤1：准备您的WordPress网站

1. 登录您的WordPress后台（通常是`your-website.com/wp-admin`）
2. 确保您的WordPress版本是6.8.3（可以在"仪表盘 > 更新"中查看）

#### 步骤2：修改WordPress配置文件

这是让WordPress能够与React前端通信的关键步骤：

1. 登录到您的网站主机控制面板（如cPanel、DirectAdmin等）
2. 找到文件管理器或使用FTP工具（如FileZilla）连接到您的网站
3. 在网站根目录找到`wp-config.php`文件并编辑它
4. 在文件末尾、`/* That's all, stop editing! Happy publishing. */`行之前添加以下代码：

```php
// 启用WordPress REST API功能
define('REST_REQUEST', true);
define('WP_REST_BLOCKS_ENABLED', true);

// 增加WordPress内存限制以处理大型请求
define('WP_MEMORY_LIMIT', '256M');

// 配置JWT认证（后面会用到）
define('JWT_AUTH_SECRET_KEY', 'your-random-secret-key'); // 可以用随机字符串替换
define('JWT_AUTH_CORS_ENABLE', true);

// 启用WP_Query缓存以提高API性能
define('WP_CACHE', true);
```

5. 保存文件并关闭编辑器

### 3. 安装必要的插件（按照顺序）

WordPress的强大之处在于插件系统，我们需要安装几个关键插件来实现与React的对接：

#### 步骤1：安装并激活REST API相关插件

1. 在WordPress后台导航到"插件 > 添加新插件"
2. 在搜索框中输入"JWT Authentication for WP REST API"并点击"安装"按钮，然后点击"激活"
3. 再次搜索"WP REST API Controller"并安装激活
4. 最后搜索"Enable CORS"并安装激活

#### 步骤2：安装并激活内容管理插件

1. 在"插件 > 添加新插件"页面搜索"Advanced Custom Fields"并安装激活
2. 搜索"Custom Post Type UI"并安装激活（用于创建自定义内容类型）

#### 步骤3：安装并激活多语言支持插件

1. 如果您需要多语言支持，搜索"Polylang"并安装激活（免费方案）
2. 对于更高级的多语言功能，可以考虑"WPML"（商业插件）

### 4. 配置API和内容结构

现在我们需要设置WordPress以匹配我们前端应用需要的数据结构：

#### 步骤1：创建自定义内容类型

1. 在WordPress后台左侧菜单中找到"CPT UI > 添加/编辑帖子类型"
2. 填写以下信息：
   - **Post Type Slug**: `properties`
   - **Plural Label**: `Properties`
   - **Singular Label**: `Property`
3. 在底部找到"REST API 支持"选项，确保选择"显示"
4. 点击"添加帖子类型"按钮

#### 步骤2：创建自定义字段

1. 在WordPress后台左侧菜单中找到"自定义字段 > 添加新"
2. 设置"字段组标题"为"Property Details"
3. 添加以下字段：
   - 字段标签: `价格`，字段名称: `price`，字段类型: `文本`
   - 字段标签: `面积`，字段名称: `area`，字段类型: `文本`
   - 字段标签: `卧室数量`，字段名称: `bedrooms`，字段类型: `数字`
   - 字段标签: `浴室数量`，字段名称: `bathrooms`，字段类型: `数字`
   - 字段标签: `特色图片`，字段名称: `featured_image`，字段类型: `图像`
4. 在页面底部的"位置"部分，设置"显示此字段组"为"等于 帖子类型 > Property"
5. 点击"发布"按钮

### 5. 前端代码修改（让您的网站连接到WordPress）

现在我们需要修改React前端代码，使其能够从WordPress获取数据：

#### 步骤1：创建WordPress API工具文件

1. 在您的项目中找到`src/utils`文件夹
2. 创建一个新文件，命名为`wordpress-api.ts`，并添加以下代码：

```typescript
import axios from 'axios';

// 重要：将以下URL替换为您的WordPress网站URL
const API_BASE_URL = 'https://your-wordpress-site.com/wp-json/wp/v2';

// 创建axios实例以便与WordPress API通信
const wpApi = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// 获取房产列表的函数
export const fetchProperties = async (page: number = 1, perPage: number = 10) => {
  try {
    const response = await wpApi.get('/properties', {
      params: {
        page,
        per_page: perPage,
        _embed: true,
      },
    });
    return response.data;
  } catch (error) {
    console.error('获取房产列表失败:', error);
    throw error;
  }
};

// 获取单条房产详情的函数
export const fetchPropertyById = async (id: number) => {
  try {
    const response = await wpApi.get(`/properties/${id}`, {
      params: { _embed: true },
    });
    return response.data;
  } catch (error) {
    console.error(`获取ID为${id}的房产失败:`, error);
    throw error;
  }
};

// 获取新闻列表的函数
export const fetchNews = async (page: number = 1, perPage: number = 10) => {
  try {
    const response = await wpApi.get('/posts', {
      params: {
        page,
        per_page: perPage,
        _embed: true,
      },
    });
    return response.data;
  } catch (error) {
    console.error('获取新闻列表失败:', error);
    throw error;
  }
};

export default wpApi;
```

3. 保存文件并关闭编辑器

#### 步骤2：修改组件以使用WordPress数据

我们需要修改`PropertyShowcase.tsx`组件来使用WordPress API获取数据：

1. 打开`src/components/PropertyShowcase.tsx`文件
2. 在文件顶部导入我们刚刚创建的API工具函数：

```typescript
import { fetchProperties } from '@/utils/wordpress-api';
```

3. 修改组件代码，添加数据获取逻辑：

```typescript
// 在组件内部添加状态和数据获取逻辑
const [properties, setProperties] = useState<Property[]>([]);
const [isLoading, setIsLoading] = useState(true);

useEffect(() => {
  // 从WordPress获取房产数据
  const loadProperties = async () => {
    try {
      setIsLoading(true);
      const data = await fetchProperties(1, 3);
      // 转换WordPress数据格式以匹配我们的组件需求
      const formattedProperties = data.map((item: any) => ({
        id: item.id,
        title: {
          zh: item.title.rendered,
          en: item.title.rendered, // 这里可以根据实际多语言设置调整
          id: item.title.rendered
        },
        location: {
          zh: item.acf.location || '巴厘岛',
          en: item.acf.location || 'Bali',
          id: item.acf.location || 'Bali'
        },
        price: {
          zh: item.acf.price,
          en: `From ${item.acf.price}`,
          id: `Dari ${item.acf.price}`
        },
        area: item.acf.area,
        bedrooms: item.acf.bedrooms,
        bathrooms: item.acf.bathrooms,
        image: item._embedded['wp:featuredmedia'] ? item._embedded['wp:featuredmedia'][0].source_url : '',
        featured: true
      }));
      setProperties(formattedProperties);
    } catch (error) {
      console.error('加载房产数据失败:', error);
      // 如果API请求失败，使用本地模拟数据
    } finally {
      setIsLoading(false);
    }
  };

  loadProperties();
}, []);

// 修改默认选中的房产
const [activeProperty, setActiveProperty] = useState(properties[0] || initialPropertyData);
```

4. 对`NewsList.tsx`、`NewsDetail.tsx`等其他需要从WordPress获取数据的组件进行类似的修改

### 6. 测试和验证

现在让我们测试一下对接是否成功：

#### 步骤1：在WordPress中添加测试数据

1. 在WordPress后台左侧菜单中找到"Properties > 添加新"
2. 创建几个测试房产，填写标题、内容和自定义字段（价格、面积等）
3. 点击"发布"按钮
4. 对"文章"也做同样操作，添加几篇测试新闻

#### 步骤2：运行前端应用并检查数据

1. 打开命令行工具，导航到您的项目目录
2. 运行`pnpm install`安装所有依赖（包括我们新添加的axios）
3. 运行`pnpm run dev`启动开发服务器
4. 打开浏览器，访问`http://localhost:3000`
5. 检查页面上是否显示了从WordPress获取的房产和新闻数据

#### 步骤3：常见问题排查

如果您遇到问题，可以检查以下几点：

1. **CORS错误**：确保您已安装并启用了"Enable CORS"插件
2. **API访问问题**：直接在浏览器中访问`https://your-wordpress-site.com/wp-json/wp/v2/properties`检查API是否正常工作
3. **权限问题**：确保WordPress的REST API有正确的访问权限
4. **数据格式问题**：检查从WordPress获取的数据格式是否与您的组件期望的格式匹配

### 7. 发布与部署

一旦您确认对接成功，可以按照第二章的部署指南将您的应用部署到生产环境。

## 五、WordPress 6.8.3多语言解决方案（进阶）

如果您需要实现多语言网站，可以在完成上述基础对接后，按照以下步骤操作：

### 1. Polylang插件配置（免费方案）

1. 在WordPress后台导航到"设置 > 语言"
2. 点击"添加新语言"按钮，添加您需要的语言（例如英语、印尼语）
3. 在"设置"选项卡中，配置URL修改方式为"使用目录"
4. 保存设置

### 2. 翻译内容

1. 在编辑房产或新闻时，您会看到语言切换器
2. 点击"+"图标为每种语言创建翻译版本
3. 翻译完成后，点击"发布"按钮

### 3. 修改前端多语言API

1. 更新`src/utils/wordpress-api.ts`文件，添加支持多语言的函数：

```typescript
// 获取特定语言的房产列表
export const fetchPropertiesByLanguage = async (lang: string = 'zh', page: number = 1, perPage: number = 10) => {
  try {
    const response = await wpApi.get('/properties', {
      params: {
        page,
        per_page: perPage,
        _embed: true,
        lang // 添加语言参数
      },
    });
    return response.data;
  } catch (error) {
    console.error(`获取${lang}语言的房产列表失败:`, error);
    throw error;
  }
};
```

2. 在您的组件中使用这些新函数替换原来的API调用

## 六、将React代码转换为WordPress模板的详细指南

本章节提供了将当前React代码转换为WordPress主题模板的完整指南，适合有一定WordPress开发基础的用户。

### 1. 理解WordPress主题结构

WordPress主题通常包含以下核心文件：
- `style.css` - 主题样式表，包含主题信息头
- `functions.php` - 主题功能和钩子
- `index.php` - 主模板文件
- `header.php` - 网站头部
- `footer.php` - 网站底部
- `page.php` - 页面模板
- `single.php` - 文章详情模板
- `archive.php` - 存档页面模板

### 2. 创建WordPress主题目录结构

首先，创建一个新的主题目录，例如命名为`pacific-garden`，在`wp-content/themes/`目录下：

```
wp-content/themes/pacific-garden/
├── assets/
│   ├── css/
│   ├── js/
│   └── images/
├── templates/
├── functions.php
├── style.css
├── index.php
├── header.php
├── footer.php
├── page.php
├── single.php
└── archive.php
```

### 3. 创建主题样式文件 (style.css)

创建`style.css`文件并添加主题信息头：

```css
/*
Theme Name: Pacific Garden
Theme URI: https://bagusnya.com
Description: A luxury real estate theme for Bali properties.
Author: Your Name
Author URI: https://yourwebsite.com
Version: 1.0
License: GNU General Public License v2 or later
License URI: http://www.gnu.org/licenses/gpl-2.0.html
Text Domain: pacific-garden
*/

/* 导入Tailwind CSS和其他样式 */
@import url('https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css');
@import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.7.2/css/all.min.css');

/* 自定义样式 */
body {
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
    color: #1e293b;
    background-color: #f8fafc;
}

/* 其他自定义样式从React项目的index.css文件中复制 */
```

### 4. 创建主题功能文件 (functions.php)

```php
<?php
/**
 * Pacific Garden Theme Functions
 */

// 注册主题支持
function pacific_garden_setup() {
    // 添加HTML5支持
    add_theme_support('html5', array('search-form', 'comment-form', 'comment-list', 'gallery', 'caption'));
    
    // 添加标题标签支持
    add_theme_support('title-tag');
    
    // 添加自定义logo支持
    add_theme_support('custom-logo');
    
    // 注册导航菜单
    register_nav_menus(array(
        'primary' => __('Primary Menu', 'pacific-garden'),
        'footer'  => __('Footer Menu', 'pacific-garden')
    ));
    
    // 添加特色图片支持
    add_theme_support('post-thumbnails');
}
add_action('after_setup_theme', 'pacific_garden_setup');

// 注册样式和脚本
function pacific_garden_enqueue_scripts() {
    // 注册样式
    wp_enqueue_style('pacific-garden-style', get_stylesheet_uri());
    
    // 注册自定义脚本
    wp_enqueue_script('pacific-garden-script', get_template_directory_uri() . '/assets/js/main.js', array(), '1.0', true);
    
    // 添加内联脚本数据
    wp_localize_script('pacific-garden-script', 'pacific_garden_data', array(
        'home_url' => home_url(),
        'api_url'  => home_url('/wp-json/wp/v2/')
    ));
}
add_action('wp_enqueue_scripts', 'pacific_garden_enqueue_scripts');

// 创建自定义文章类型
function pacific_garden_create_post_types() {
    // 创建房产项目自定义文章类型
    register_post_type('properties', array(
        'labels' => array(
            'name' => __('Properties', 'pacific-garden'),
            'singular_name' => __('Property', 'pacific-garden')
        ),
        'public' => true,
        'has_archive' => true,
        'supports' => array('title', 'editor', 'thumbnail', 'excerpt'),
        'rewrite' => array('slug' => 'properties'),
        'show_in_rest' => true
    ));
}
add_action('init', 'pacific_garden_create_post_types');

// 自定义REST API响应
function pacific_garden_rest_prepare_property($response, $post, $request) {
    $data = $response->get_data();
    
    // 添加自定义字段数据
    $data['acf'] = get_fields($post->ID);
    
    $response->set_data($data);
    return $response;
}
add_filter('rest_prepare_properties', 'pacific_garden_rest_prepare_property', 10, 3);
```

### 5. 创建基本模板文件

#### 5.1 创建header.php

```php
<!DOCTYPE html>
<html <?php language_attributes(); ?>>
<head>
    <meta charset="<?php bloginfo('charset'); ?>">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="profile" href="https://gmpg.org/xfn/11">
    <?php wp_head(); ?>
</head>
<body <?php body_class(); ?>>
    <header class="sticky top-0 z-50 bg-white/90 backdrop-blur-sm shadow-sm">
        <div class="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16 md:h-20">
                <!-- Logo -->
                <div className="flex items-center">
                    <a href="<?php echo home_url(); ?>" className="text-2xl font-bold text-blue-900 flex items-center">
                        <i className="fa-solid fa-palm-tree mr-2 text-amber-600"></i>
                        <span>Pacific Garden Bali</span>
                    </a>
                </div>
                
                <!-- Desktop Navigation -->
                <div className="hidden md:flex items-center space-x-8">
                    <?php 
                    wp_nav_menu(array(
                        'theme_location' => 'primary',
                        'menu_class' => 'flex space-x-8',
                        'link_class' => 'text-blue-900 hover:text-amber-600 font-medium transition-colors'
                    ));
                    ?>
                    
                    <!-- Language Selector -->
                    <div className="relative ml-4">
                        <button type="button" className="flex items-center text-gray-700 hover:text-amber-600 focus:outline-none">
                            <span className="mr-1">English</span>
                            <i className="fa-solid fa-chevron-down text-xs"></i>
                        </button>
                    </div>
                </div>
                
                <!-- Contact Button -->
                <div className="hidden md:block">
                    <button class="bg-amber-600 hover:bg-amber-700 text-white px-5 py-2 rounded-full font-medium transition-all transform hover:scale-105 shadow-md hover:shadow-lg">
                        立即咨询
                    </button>
                </div>
                
                <!-- Mobile Menu Button -->
                <div className="md:hidden flex items-center space-x-4">
                    <button type="button" className="text-gray-600 hover:text-amber-600 focus:outline-none">
                        <i className="fa-solid fa-bars text-xl"></i>
                    </button>
                </div>
            </div>
        </div>
    </header>
```

#### 5.2 创建footer.php

```php
<footer class="bg-blue-900 text-white pt-16 pb-8">
    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
            <!-- Company Info -->
            <div>
                <div className="text-2xl font-bold flex items-center mb-6">
                    <i className="fa-solid fa-palm-tree mr-2 text-amber-500"></i>
                    <span>Pacific Garden Bali</span>
                </div>
                <p className="text-blue-200 mb-6">
                    Creating luxury living spaces in Bali's most beautiful locations since 2010
                </p>
                <div className="flex space-x-4">
                    <!-- Social Media Links -->
                    <a href="#" className="w-10 h-10 rounded-full bg-[#07C160] flex items-center justify-center text-white hover:bg-amber-600 transition-colors">
                        <i className="fa-brands fa-whatsapp"></i>
                    </a>
                    <a href="#" className="w-10 h-10 rounded-full bg-[#E1306C] flex items-center justify-center text-white hover:bg-amber-600 transition-colors">
                        <i className="fa-brands fa-instagram"></i>
                    </a>
                    <a href="#" className="w-10 h-10 rounded-full bg-[#4267B2] flex items-center justify-center text-white hover:bg-amber-600 transition-colors">
                        <i className="fa-brands fa-facebook"></i>
                    </a>
                    <a href="#" className="w-10 h-10 rounded-full bg-[#FF0000] flex items-center justify-center text-white hover:bg-amber-600 transition-colors">
                        <i className="fa-brands fa-youtube"></i>
                    </a>
                </div>
            </div>
            
            <!-- Quick Links -->
            <div>
                <h4 className="text-lg font-medium mb-6">Quick Links</h4>
                <?php 
                wp_nav_menu(array(
                    'theme_location' => 'footer',
                    'menu_class' => 'space-y-3',
                    'link_class' => 'text-blue-200 hover:text-amber-500 transition-colors flex items-center'
                ));
                ?>
            </div>
            
            <!-- Property Types -->
            <div>
                <h4 className="text-lg font-medium mb-6">Property Types</h4>
                <ul className="space-y-3">
                    <li>
                        <a href="#" className="text-blue-200 hover:text-amber-500 transition-colors flex items-center">
                            <i className="fa-solid fa-angle-right mr-2 text-xs"></i>
                            Luxury Duplex Apartment (Type 8)
                        </a>
                    </li>
                    <li>
                        <a href="#" className="text-blue-200 hover:text-amber-500 transition-colors flex items-center">
                            <i className="fa-solid fa-angle-right mr-2 text-xs"></i>
                            Beachfront Villa (Type 6)
                        </a>
                    </li>
                    <li>
                        <a href="#" className="text-blue-200 hover:text-amber-500 transition-colors flex items-center">
                            <i className="fa-solid fa-angle-right mr-2 text-xs"></i>
                            Hilltop Pool Villa (Type 5)
                        </a>
                    </li>
                </ul>
            </div>
            
            <!-- Contact Info -->
            <div>
                <h4 className="text-lg font-medium mb-6">Contact Information</h4>
                <ul className="space-y-3">
                    <li className="flex items-start">
                        <i className="fa-solid fa-map-marker-alt text-amber-500 mt-1 mr-3 w-4 text-center"></i>
                        <span className="text-blue-200">Jl. Pantai Mengiat, Nusa Dua, Bali 80363</span>
                    </li>
                    <li className="flex items-start">
                        <i className="fa-solid fa-phone text-amber-500 mt-1 mr-3 w-4 text-center"></i>
                        <span className="text-blue-200">+62 361 8480 888</span>
                    </li>
                    <li className="flex items-start">
                        <i className="fa-solid fa-envelope text-amber-500 mt-1 mr-3 w-4 text-center"></i><span className="text-blue-200">info@pacificgardenbali.com</span>
                    </li>
                </ul>
            </div>
        </div>
        
        <div class="border-t border-blue-800 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center">
                <div className="text-blue-300 text-sm mb-4 md:mb-0">
                    &copy; <?php echo date('Y'); ?> Pacific Garden Bali. All Rights Reserved
                </div>
                <div className="flex space-x-6">
                    <a href="#" className="text-blue-300 hover:text-amber-500 text-sm transition-colors">Privacy Policy</a>
                    <a href="#" className="text-blue-300 hover:text-amber-500 text-sm transition-colors">Terms of Service</a>
                    <a href="#" className="text-blue-300 hover:text-amber-500 text-sm transition-colors">Sitemap</a>
                </div>
            </div>
        </div>
    </div>
</footer>

<?php wp_footer(); ?>
</body>
</html>
```

#### 5.3 创建index.php

```php
<?php get_header(); ?>

<main class="flex-grow">
    <!-- Hero Section -->
    <section class="relative h-[80vh] min-h-[600px] overflow-hidden">
        <div className="relative h-full w-full">
            <img 
                src="https://space.coze.cn/api/coze_space/gen_image?image_size=landscape_16_9&prompt=Tropical%20luxury%20resort%20with%20infinity%20pool%2C%20palm%20trees%2C%20ocean%20view%2C%20sunset%2C%20modern%20architecture%2C%20Bali%20inspired&sign=b97de185451693ceff512e194d5462d0" 
                alt="Pacific Garden Bali" 
                className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-blue-900/80 to-blue-900/40"></div>
        </div>
        
        <div className="relative z-20 container mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center">
            <div className="max-w-2xl text-white">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-4">
                    Discover Your<br />Dream Home in Bali
                </h1>
                <p className="text-lg md:text-xl mb-8 text-blue-100">
                    Pacific Garden Puri offers exclusive luxury properties in Bali's most prestigious locations, combining tropical elegance with modern comfort.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                    <a href="#properties" className="bg-amber-600 hover:bg-amber-700 text-white px-8 py-3 rounded-full font-medium text-center transition-all transform hover:scale-105 shadow-lg">
                        Browse Properties
                    </a>
                    <a href="#contact" className="bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white border border-white/40 px-8 py-3 rounded-full font-medium text-center transition-all">
                        Contact Us
                    </a>
                </div>
            </div>
        </div>
    </section>
    
    <!-- Property Showcase Section -->
    <section id="properties" className="py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-16">
                <h2 className="text-3xl md:text-4xl font-bold text-blue-900 mb-4">Our Exclusive Properties</h2>
                <p className="text-gray-600">Discover our handpicked selection of luxury villas and apartments in Bali's most desirable locations</p>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <!-- Property Image -->
                <div className="relative rounded-2xl overflow-hidden shadow-xl group">
                    <img 
                        src="https://space.coze.cn/api/coze_space/gen_image?image_size=landscape_16_9&prompt=Luxury%20duplex%20apartment%20with%20high%20ceiling%2C%20modern%20interior%2C%20private%20terrace%2C%20tropical%20design%2C%20Bali&sign=5fa755144e22019a78ef53aadd75fca7" 
                        alt="Luxury Duplex Apartment" 
                        className="w-full h-[500px] object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute top-4 left-4 bg-amber-600 text-white text-xs font-bold px-3 py-1 rounded-full">Featured</div>
                </div>
                
                <!-- Property Details -->
                <div>
                    <div className="flex space-x-4 mb-8 overflow-x-auto pb-2 scrollbar-hide">
                        <button className="flex-shrink-0 px-6 py-3 rounded-full transition-all bg-blue-900 text-white shadow-lg">
                            Luxury Duplex Apartment (Type 8)
                        </button>
                        <button className="flex-shrink-0 px-6 py-3 rounded-full transition-all bg-gray-100 text-gray-600 hover:bg-gray-200">
                            Beachfront Villa (Type 6)
                        </button>
                        <button className="flex-shrink-0 px-6 py-3 rounded-full transition-all bg-gray-100 text-gray-600 hover:bg-gray-200">
                            Hilltop Pool Villa (Type 5)
                        </button>
                    </div>
                    
                    <div className="mb-8">
                        <div className="text-3xl font-bold text-blue-900 mb-2">From ¥19.8M</div>
                        <div className="text-gray-600">Starting Price</div>
                    </div>
                    
                    <div className="grid grid-cols-3 gap-4 mb-8 text-center">
                        <div className="bg-gray-50 p-4 rounded-xl">
                            <i className="fa-solid fa-ruler-combined text-amber-600 text-xl mb-2"></i>
                            <div className="font-medium">260-320㎡</div>
                            <div className="text-xs text-gray-500">Area</div>
                        </div>
                        <div className="bg-gray-50 p-4 rounded-xl">
                            <i className="fa-solid fa-bed text-amber-600 text-xl mb-2"></i>
                            <div className="font-medium">4</div>
                            <div className="text-xs text-gray-500">Bedrooms</div>
                        </div>
                        <div className="bg-gray-50 p-4 rounded-xl">
                            <i className="fa-solid fa-bath text-amber-600 text-xl mb-2"></i>
                            <div className="font-medium">3</div>
                            <div className="text-xs text-gray-500">Bathrooms</div>
                        </div>
                    </div>
                    
                    <p className="text-gray-600 mb-8">
                        Type 8 Luxury Duplex Apartment is our newest flagship product, located in the heart of Nusa Dua with stunning Indian Ocean views. Each unit features high ceilings, floor-to-ceiling windows and private balconies, providing spacious and bright living spaces.
                    </p>
                    
                    <div className="flex flex-wrap gap-3 mb-8">
                        <span className="inline-flex items-center bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-sm">
                            <i className="fa-solid fa-check-circle mr-1 text-amber-600"></i>
                            Smart Home System
                        </span>
                        <span className="inline-flex items-center bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-sm">
                            <i className="fa-solid fa-check-circle mr-1 text-amber-600"></i>
                            24/7 Security
                        </span>
                        <span className="inline-flex items-center bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-sm">
                            <i className="fa-solid fa-check-circle mr-1 text-amber-600"></i>
                            Private Gym
                        </span>
                    </div>
                    
                    <div className="flex flex-col sm:flex-row gap-4">
                        <a href="#contact" className="bg-amber-600 hover:bg-amber-700 text-white px-8 py-3 rounded-full font-medium text-center transition-all transform hover:scale-105 shadow-md hover:shadow-lg">
                            Book Viewing
                        </a>
                        <a href="#" className="bg-white border border-gray-300 hover:border-blue-900 text-gray-700 px-8 py-3 rounded-full font-medium text-center transition-all flex items-center justify-center">
                            <i className="fa-solid fa-share-alt mr-2"></i> Share
                        </a>
                    </div>
                </div>
            </div>
        </div>
    </section>
    
    <!-- Features Section -->
    <section id="features" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-16">
                <h2 className="text-3xl md:text-4xl font-bold text-blue-900 mb-4">Why Choose Pacific Garden Puri</h2>
                <p className="text-gray-600">Experience the ultimate in tropical luxury living with our exclusive properties</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow group">
                    <div className="w-14 h-14 bg-blue-100 text-blue-900 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-amber-600 group-hover:text-white transition-colors">
                        <i className="fa-solid fa-map-marker-alt text-2xl"></i>
                    </div>
                    <h3 className="text-xl font-bold text-blue-900 mb-3">Prestigious Locations</h3>
                    <p className="text-gray-600">All our properties are situated in Bali's most desirable areas, offering stunning views and convenient access to beaches, restaurants, and cultural attractions</p>
                </div>
                <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow group">
                    <div className="w-14 h-14 bg-blue-100 text-blue-900 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-amber-600 group-hover:text-white transition-colors">
                        <i className="fa-solid fa-home text-2xl"></i>
                    </div>
                    <h3 className="text-xl font-bold text-blue-900 mb-3">Exceptional Quality</h3>
                    <p className="text-gray-600">Each property is meticulously crafted using premium materials and finishes, ensuring the highest standards of construction and design</p>
                </div>
                <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow group">
                    <div className="w-14 h-14 bg-blue-100 text-blue-900 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-amber-600 group-hover:text-white transition-colors">
                        <i className="fa-solid fa-concierge-bell text-2xl"></i>
                    </div>
                    <h3 className="text-xl font-bold text-blue-900 mb-3">Premium Services</h3>
                    <p className="text-gray-600">Our dedicated team provides personalized service, from property selection to post-purchase support, ensuring a seamless experience</p>
                </div>
                <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow group">
                    <div className="w-14 h-14 bg-blue-100 text-blue-900 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-amber-600 group-hover:text-white transition-colors">
                        <i className="fa-solid fa-chart-line text-2xl"></i>
                    </div>
                    <h3 className="text-xl font-bold text-blue-900 mb-3">Prime Investment</h3>
                    <p className="text-gray-600">Bali's real estate market offers excellent growth potential, making our properties not just a home but a smart investment</p>
                </div>
            </div>
            
            <!-- News Section -->
            <div className="mt-24">
                <h3 className="text-2xl md:text-3xl font-bold text-blue-900 mb-8 text-center">Latest News</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    <!-- News Item 1 -->
                    <div className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all group">
                        <div className="relative h-48 overflow-hidden">
                            <img 
                                src="https://space.coze.cn/api/coze_space/gen_image?image_size=landscape_16_9&prompt=Real%20estate%20market%20analysis%20with%20growth%20charts%2C%20property%20investment%2C%20Bali%20tourism%20recovery&sign=70b1ba3b1f8518fafb4d206733d2d00e" 
                                alt="Bali Real Estate Market Outlook 2025" 
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                            />
                            <div className="absolute top-4 left-4 bg-amber-600 text-white text-xs font-bold px-3 py-1 rounded-full">市场动态</div>
                        </div>
                        <div className="p-6">
                            <div className="text-gray-500 text-sm mb-2">2025-10-15</div>
                            <h4 className="text-xl font-bold text-blue-900 mb-3 line-clamp-2 group-hover:text-amber-600 transition-colors">
                                Bali Real Estate Market Outlook 2025: Sustained Growth Trend
                            </h4>
                            <p className="text-gray-600 mb-4 line-clamp-3">
                                With the recovery of tourism, Bali's real estate market shows strong growth momentum. The Nusa Dua area where Pacific Garden is located is particularly favored by international investors...
                            </p>
                            <a href="#" className="inline-flex items-center text-amber-600 font-medium hover:text-amber-700 transition-colors">
                                Read More
                                <i className="fa-solid fa-arrow-right ml-2 text-sm"></i>
                            </a>
                        </div>
                    </div>
                    
                    <!-- News Item 2 -->
                    <div className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all group">
                        <div className="relative h-48 overflow-hidden">
                            <img 
                                src="https://space.coze.cn/api/coze_space/gen_image?image_size=landscape_16_9&prompt=Modern%20luxury%20apartment%20interior%20with%20high%20ceiling%2C%20large%20windows%2C%20tropical%20design%2C%20Bali&sign=d70bb0fecdae5e525aeca73004d31b1f" 
                                alt="Pacific Garden's New Type 8 Luxury Duplex Apartments" 
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                            />
                            <div className="absolute top-4 left-4 bg-amber-600 text-white text-xs font-bold px-3 py-1 rounded-full">项目更新</div>
                        </div>
                        <div className="p-6">
                            <div className="text-gray-500 text-sm mb-2">2025-10-08</div>
                            <h4 className="text-xl font-bold text-blue-900 mb-3 line-clamp-2 group-hover:text-amber-600 transition-colors">
                                Pacific Garden's New Type 8 Luxury Duplex Apartments Coming Soon
                            </h4>
                            <p className="text-gray-600 mb-4 line-clamp-3">We are excited to announce that Pacific Garden's brand new Type 8 Luxury Duplex Apartments will be officially launched in November. This project combines modern design with traditional Balinese elements...
                            </p>
                            <a href="#" className="inline-flex items-center text-amber-600 font-medium hover:text-amber-700 transition-colors">
                                Read More
                                <i className="fa-solid fa-arrow-right ml-2 text-sm"></i>
                            </a>
                        </div>
                    </div>
                    
                    <!-- News Item 3 -->
                    <div className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all group">
                        <div className="relative h-48 overflow-hidden">
                            <img 
                                src="https://space.coze.cn/api/coze_space/gen_image?image_size=landscape_16_9&prompt=Property%20law%20and%20policy%20documentation%2C%20real%20estate%20investment%20regulations%2C%20Bali%20government%20office&sign=fe1032790a0e3a1933d6a892cbcfeccd" 
                                alt="Bali Government New Policy" 
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                            />
                            <div className="absolute top-4 left-4 bg-amber-600 text-white text-xs font-bold px-3 py-1 rounded-full">政策法规</div>
                        </div>
                        <div className="p-6">
                            <div className="text-gray-500 text-sm mb-2">2025-09-28</div>
                            <h4 className="text-xl font-bold text-blue-900 mb-3 line-clamp-2 group-hover:text-amber-600 transition-colors">
                                Bali Government Introduces New Policy to Simplify Property Purchase Process
                            </h4>
                            <p className="text-gray-600 mb-4 line-clamp-3">
                                The Bali provincial government recently announced a new policy aimed at simplifying the process for foreigners to purchase property in Bali. This move is expected to further boost the development...
                            </p>
                            <a href="#" className="inline-flex items-center text-amber-600 font-medium hover:text-amber-700 transition-colors">
                                Read More
                                <i className="fa-solid fa-arrow-right ml-2 text-sm"></i>
                            </a>
                        </div>
                    </div>
                </div>
                
                <div className="text-center mt-12">
                    <a href="#" className="inline-flex items-center justify-center bg-white border border-blue-900 text-blue-900 px-8 py-3 rounded-full font-medium transition-all hover:bg-blue-900 hover:text-white shadow-md">
                        View All News
                        <i className="fa-solid fa-arrow-right ml-2"></i>
                    </a>
                </div>
            </div>
        </div>
    </section>
    
    <!-- About Section -->
    <section id="about" className="py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-20">
                <div className="relative">
                    <div className="rounded-2xl overflow-hidden shadow-xl">
                        <img 
                            src="https://space.coze.cn/api/coze_space/gen_image?image_size=landscape_16_9&prompt=Professional%20real%20estate%20team%20in%20tropical%20resort%20setting%2C%20showing%20property%20models%2C%20smiling%20and%20confident&sign=7738ecf291fcf226a6d4ea0583ac95b3" 
                            alt="About Pacific Garden" 
                            className="w-full h-auto"
                        />
                    </div>
                </div>
                
                <div>
                    <h2 className="text-3xl md:text-4xl font-bold text-blue-900 mb-6">About Pacific Garden Puri</h2>
                    <p className="text-gray-600 mb-6">
                        Pacific Garden Puri is a leading luxury real estate developer specializing in exclusive properties in Bali. With over 15 years of experience, we have established a reputation for excellence in design, construction, and customer service.
                    </p>
                    <p className="text-gray-600 mb-8">
                        Our mission is to create exceptional living spaces that capture the essence of Balinese culture while providing all the comforts and amenities of modern luxury living. We are committed to sustainable development and preserving Bali's natural beauty.
                    </p>
                    
                    <div className="flex flex-wrap gap-4">
                        <a href="#contact" className="bg-blue-900 hover:bg-blue-800 text-white px-8 py-3 rounded-full font-medium transition-all transform hover:scale-105 shadow-md">
                            Learn More
                        </a>
                        <a href="#properties" className="bg-white border border-gray-300 hover:border-blue-900 text-gray-700 px-8 py-3 rounded-full font-medium transition-all">
                            View Projects
                        </a>
                    </div>
                </div>
            </div>
            
            <div className="rounded-2xl overflow-hidden shadow-xl">
                <h3 className="text-2xl font-bold text-blue-900 mb-6 text-center">
                    Office Address
                </h3>
                <div className="bg-gray-100 p-4 flex flex-col items-center">
                    <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3943.9879440697325!2d115.15066631544223!3d-8.749896993827219!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2dd2458e06f8d557%3A0x372fa77781e8b24c!2sJl.%20Pantai%20Mengiat%2C%20Nusa%20Dua%2C%20Badung%20Regency%2C%20Bali!5e0!3m2!1sen!2sid!4v1635703112427!5m2!1sen!2sid"
                        width="100%"
                        height="450"
                        style={{ border: 0 }}
                        allowFullScreen
                        loading="lazy"
                        title="Office Location"
                        className="rounded-xl shadow-lg"
                    ></iframe>
                </div>
            </div>
        </div>
    </section>
    
    <!-- Contact Section -->
    <section id="contact" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-16">
                <h2 className="text-3xl md:text-4xl font-bold text-blue-900 mb-4">Contact Us</h2>
                <p className="text-gray-600">Fill out the form below and our property consultants will contact you to discuss your dream property in Bali</p>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                {/* Form */}
                <div className="bg-white p-8 md:p-10 rounded-2xl shadow-xl">
                    <form className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                                    Name <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-900 focus:border-blue-900 transition-all"
                                    placeholder="Please enter your name"
                                    required
                                />
                            </div>
                            
                            <div>
                                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                                    Phone <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="tel"
                                    id="phone"
                                    name="phone"
                                    className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-900 focus:border-blue-900 transition-all"
                                    placeholder="Please enter your phone number"
                                    required
                                />
                            </div>
                        </div>
                        
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                                Email Address
                            </label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-900 focus:border-blue-900 transition-all"
                                placeholder="Please enter your email address (optional)"
                            />
                        </div>
                        
                        <div>
                            <label htmlFor="interestedProperty" className="block text-sm font-medium text-gray-700 mb-1">
                                Interested Property <span className="text-red-500">*</span>
                            </label>
                            <select
                                id="interestedProperty"
                                name="interestedProperty"
                                className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-900 focus:border-blue-900 transition-all appearance-none bg-white"
                                required
                            >
                                <option value="">Please select the property you are interested in</option>
                                <option value="luxury-ocean-view">Luxury Ocean View Apartment (Type 1)</option>
                                <option value="garden-villa">Garden Villa (Type 2)</option>
                                <option value="penthouse-suite">Penthouse Suite (Type 3)</option>
                                <option value="hilltop-villa">Hilltop Pool Villa (Type 5)</option>
                                <option value="beachfront-villa">Beachfront Villa (Type 6)</option>
                                <option value="luxury-duplex">Luxury Duplex (Type 8)</option>
                            </select>
                        </div>
                        
                        <div><label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                                Message <span className="text-red-500">*</span>
                            </label>
                            <textarea
                                id="message"
                                name="message"
                                rows={4}
                                className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-900 focus:border-blue-900 transition-all resize-none"
                                placeholder="Please enter your inquiry..."
                                required
                            ></textarea>
                        </div>
                        
                        <div className="flex items-start">
                            <div className="flex items-center h-5">
                                <input
                                    id="agreeTerms"
                                    name="agreeTerms"
                                    type="checkbox"
                                    className="w-4 h-4 text-blue-900 focus:ring-blue-900 border-gray-300 rounded"
                                    required
                                />
                            </div>
                            <div className="ml-3 text-sm">
                                <label htmlFor="agreeTerms" className="text-gray-600">
                                    I agree to Pacific Garden Puri processing my personal information in accordance with the Privacy Policy <span className="text-red-500">*</span>
                                </label>
                            </div>
                        </div>
                        
                        <button
                            type="submit"
                            className="w-full bg-amber-600 hover:bg-amber-700 text-white px-6 py-3 rounded-xl font-medium transition-all transform hover:scale-[1.02] shadow-lg flex items-center justify-center"
                        >
                            Submit Inquiry
                            <i className="fa-solid fa-arrow-right ml-2"></i>
                        </button>
                    </form>
                </div>
                
                {/* Contact Info */}
                <div>
                    <h3 className="text-2xl font-bold text-blue-900 mb-6">Contact Information</h3>
                    
                    <div className="space-y-6 mb-10">
                        <div className="flex items-start">
                            <div className="w-12 h-12 bg-blue-100 text-blue-900 rounded-xl flex items-center justify-center mr-4 flex-shrink-0">
                                <i className="fa-solid fa-map-marker-alt text-xl"></i>
                            </div>
                            <div>
                                <h4 className="font-medium text-blue-900 mb-1">Office Address</h4>
                                <p className="text-gray-600">Jl. Pantai Mengiat, Nusa Dua, Bali 80363, Indonesia</p>
                            </div>
                        </div>
                        
                        <div className="flex items-start">
                            <div className="w-12 h-12 bg-blue-100 text-blue-900 rounded-xl flex items-center justify-center mr-4 flex-shrink-0">
                                <i className="fa-solid fa-phone text-xl"></i>
                            </div>
                            <div>
                                <h4 className="font-medium text-blue-900 mb-1">Phone</h4>
                                <p className="text-gray-600">+62 361 8480 888</p>
                                <p className="text-gray-500 text-sm">Monday-Sunday 9:00-20:00</p>
                            </div>
                        </div>
                        
                        <div className="flex items-start">
                            <div className="w-12 h-12 bg-blue-100 text-blue-900 rounded-xl flex items-center justify-center mr-4 flex-shrink-0">
                                <i className="fa-solid fa-envelope text-xl"></i>
                            </div>
                            <div>
                                <h4 className="font-medium text-blue-900 mb-1">Email</h4>
                                <p className="text-gray-600">info@pacificgardenbali.com</p>
                            </div>
                        </div>
                    </div>
                    
                    <div className="bg-blue-50 p-6 rounded-2xl mb-8">
                        <h4 className="font-medium text-blue-900 mb-4">Working Hours</h4>
                        <div className="space-y-2">
                            <div className="flex justify-between">
                                <div className="text-gray-600">Weekdays</div>
                                <div className="font-medium text-blue-900">9:00 - 20:00</div>
                            </div>
                            <div className="flex justify-between">
                                <div className="text-gray-600">Weekends</div>
                                <div className="font-medium text-blue-900">9:00 - 18:00</div>
                            </div>
                        </div>
                    </div>
                    
                    <div>
                        <h4 className="font-medium text-blue-900 mb-4">Follow Us</h4>
                        <div className="flex space-x-4">
                            <a href="#" className="w-12 h-12 rounded-full flex items-center justify-center text-white shadow-md hover:shadow-lg transition-all transform hover:scale-110" style={{ backgroundColor: '#07C160' }}>
                                <i className="fa-brands fa-whatsapp"></i>
                            </a>
                            <a href="#" className="w-12 h-12 rounded-full flex items-center justify-center text-white shadow-md hover:shadow-lg transition-all transform hover:scale-110" style={{ backgroundColor: '#E1306C' }}>
                                <i className="fa-brands fa-instagram"></i>
                            </a>
                            <a href="#" className="w-12 h-12 rounded-full flex items-center justify-center text-white shadow-md hover:shadow-lg transition-all transform hover:scale-110" style={{ backgroundColor: '#4267B2' }}>
                                <i className="fa-brands fa-facebook"></i>
                            </a>
                            <a href="#" className="w-12 h-12 rounded-full flex items-center justify-center text-white shadow-md hover:shadow-lg transition-all transform hover:scale-110" style={{ backgroundColor: '#FF0000' }}>
                                <i className="fa-brands fa-youtube"></i>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</main>

<?php get_footer(); ?>
```

### 6. 创建自定义模板

为房产项目和新闻创建自定义模板：

#### 6.1 创建房产项目模板 (templates/template-properties.php)

```php
<?php
/*
Template Name: Properties Page
*/
get_header(); ?>

<main class="flex-grow">
    <section className="bg-blue-900 text-white py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-3xl md:text-5xl font-bold mb-4">Properties</h1>
            <p className="text-blue-100 text-lg max-w-2xl">
                Explore Pacific Garden Puri's luxury property projects, where each property combines Bali's natural beauty with modern luxurious living.
            </p>
        </div>
    </section>
    
    <section className="py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                <?php
                // 查询房产项目
                $args = array(
                    'post_type' => 'properties',
                    'posts_per_page' => -1,
                );
                $properties_query = new WP_Query($args);
                
                if ($properties_query->have_posts()) :
                    while ($properties_query->have_posts()) : $properties_query->the_post();
                        $price = get_field('price');
                        $area = get_field('area');
                        $bedrooms = get_field('bedrooms');
                        $bathrooms = get_field('bathrooms');
                ?>
                <div className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all group">
                    <div className="relative h-52 overflow-hidden">
                        <?php the_post_thumbnail('property-thumbnail', array('className' => 'w-full h-full object-cover transition-transform duration-700 group-hover:scale-105')); ?>
                    </div>
                    <div className="p-6">
                        <h3 className="text-xl font-bold text-blue-900 mb-3 line-clamp-2 group-hover:text-amber-600 transition-colors">
                            <?php the_title(); ?>
                        </h3>
                        <div className="text-xl font-bold text-amber-600 mb-4">
                            <?php echo esc_html($price); ?>
                        </div>
                        <div className="grid grid-cols-3 gap-4 mb-6 text-center">
                            <div className="bg-gray-50 p-2 rounded-xl">
                                <div className="font-medium">{echo esc_html($area);}</div>
                                <div className="text-xs text-gray-500">Area</div>
                            </div>
                            <div className="bg-gray-50 p-2 rounded-xl">
                                <div className="font-medium">{echo esc_html($bedrooms);}</div>
                                <div className="text-xs text-gray-500">Bedrooms</div>
                            </div>
                            <div className="bg-gray-50 p-2 rounded-xl">
                                <div className="font-medium">{echo esc_html($bathrooms);}</div>
                                <div className="text-xs text-gray-500">Bathrooms</div>
                            </div>
                        </div>
                        <a href="<?php the_permalink(); ?>" className="inline-flex items-center text-amber-600 font-medium hover:text-amber-700 transition-colors">
                            View Details
                            <i className="fa-solid fa-arrow-right ml-2 text-sm"></i>
                        </a>
                    </div>
                </div>
                <?php
                    endwhile;
                    wp_reset_postdata();
                else :
                    echo '<p>No properties found.</p>';
                endif;
                ?>
            </div>
        </div>
    </section>
</main>

<?php get_footer(); ?>
```

### 7. 添加JavaScript功能

创建`assets/js/main.js`文件，添加必要的交互功能：

```javascript
document.addEventListener('DOMContentLoaded', function() {
    // 平滑滚动
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
    
    // 表单验证
    const contactForm = document.querySelector('form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            // 实现表单验证和提交逻辑
            alert('Form submitted!');
        });
    }
    
    // 其他交互功能可以从React项目中迁移
});
```

### 8. 完成主题配置

1. 登录WordPress后台
2. 导航到"外观 > 主题"
3. 激活您创建的"Pacific Garden"主题
4. 导航到"外观 > 菜单"，创建导航菜单并分配到相应位置
5. 导航到"设置 > 固定链接"，选择"文章名称"选项以启用友好的URL

### 9. 注意事项

- 此指南提供了基本的转换框架，实际转换过程中可能需要根据具体情况进行调整
- 对于高级功能，如多语言支持、动态内容加载等，可能需要使用WordPress插件或进一步的自定义开发
- 建议在本地环境中测试完成后再部署到生产环境

通过这个详细指南，您应该能够将React前端代码成功转换为功能完整的WordPress主题模板，同时保留原有的设计和功能。

## 七、部署到宝塔面板与WordPress后台对接详细指南

本章节提供了将React前端应用部署到宝塔面板，并与WordPress后台进行对接的详细步骤指南。

### 1. 前提条件

在开始之前，请确保您已经：
- 注册了域名并完成了DNS解析配置
- 拥有一台VPS或云服务器
- 已在服务器上安装了宝塔面板
- 已在宝塔面板中安装了WordPress 6.8.3（如未安装，可参考本指南后续步骤）

### 2. 宝塔面板基本设置

#### 步骤1：登录宝塔面板

1. 打开浏览器，输入您的服务器IP地址和宝塔面板端口号（通常为`http://your-server-ip:8888`）
2. 输入您的用户名和密码登录宝塔面板

#### 步骤2：添加网站

1. 在宝塔面板左侧菜单中找到"网站"，点击进入
2. 点击"添加网站"按钮
3. 填写网站信息：
   - **域名**: 输入您的域名（如`bagusnya.com`）
   - **根目录**: 默认即可，或自定义网站文件存放目录
   - **FTP**: 可选，如需FTP访问可勾选并设置用户名密码
   - **数据库**: 可选，如需数据库可勾选并设置数据库名、用户名和密码
   - **PHP版本**: 选择PHP 7.4或更高版本
4. 点击"提交"按钮，完成网站创建

### 3. 在宝塔面板中安装WordPress 6.8.3

1. 在您刚创建的网站列表中，点击"一键部署"按钮
2. 在弹出的窗口中选择"WordPress"，然后点击"立即部署"
3. 设置WordPress网站信息：
   - **版本选择**: 选择最新的WordPress 6.8.3版本
   - **数据库**: 可以使用已创建的数据库或新建
   - **站点名称**: 输入您的站点名称
   - **管理员账号**: 设置WordPress管理员账号
   - **管理员密码**: 设置WordPress管理员密码
   - **管理员邮箱**: 设置管理员邮箱
4. 点击"提交"按钮，等待WordPress安装完成
5. 安装完成后，点击"访问站点"或直接在浏览器中输入您的域名即可访问WordPress前台

### 4. 配置WordPress后台与REST API

1. 访问`your-domain.com/wp-admin`登录WordPress后台
2. 按照本指南第四章"WordPress 6.8.3小白式详细对接教程"的步骤配置WordPress：
   - 安装必要的插件（JWT Authentication、REST API Controller、Enable CORS、Advanced Custom Fields、Custom Post Type UI）
   - 修改wp-config.php配置文件
   - 创建自定义内容类型和字段

### 5. 构建并部署React前端应用

#### 步骤1：本地构建React应用

1. 在本地开发环境中，导航到React项目目录
2. 运行以下命令构建项目：
```bash
pnpm install
pnpm run build
```
3. 构建完成后，会在项目根目录生成一个`dist`文件夹，包含所有打包后的静态文件

#### 步骤2：将构建文件上传到宝塔面板

1. 在宝塔面板中，找到您之前创建的网站，点击"文件"按钮
2. 进入网站根目录，创建一个新文件夹（例如`frontend`）
3. 将本地`dist`文件夹中的所有文件上传到这个新文件夹中
4. 上传完成后，您应该可以通过`your-domain.com/frontend`访问React应用

#### 步骤3：配置Nginx反向代理（可选，推荐）

为了让用户通过主域名直接访问React前端应用，而不是通过`/frontend`路径，您可以配置Nginx反向代理：

1. 在宝塔面板中，找到您的网站，点击"设置"按钮
2. 选择"反向代理"选项卡
3. 点击"添加反向代理"按钮
4. 设置反向代理：
   - **代理名称**: 输入一个名称，如"React Frontend"
   - **目标URL**: 输入`http://127.0.0.1/frontend`（确保路径正确）
   - **发送域名**: 保持默认
   - **保存位置**: 保持默认
5. 点击"保存"按钮，完成反向代理配置
6. 现在，访问您的主域名（如`bagusnya.com`）应该会显示React前端应用

### 6. 配置WordPress REST API跨域访问

1. 在宝塔面板中，找到您的WordPress网站，点击"文件"按钮
2. 找到并编辑`wp-config.php`文件
3. 在文件末尾、`/* That's all, stop editing! Happy publishing. */`行之前添加以下代码：

```php
// 配置CORS允许从React前端访问
define('WP_REST_CORS_ENABLE', true);
define('WP_REST_CORS_ORIGINS', 'https://your-domain.com');

// 为REST API添加CORS头
function add_cors_http_header() {
  header("Access-Control-Allow-Origin: *");
  header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
  header("Access-Control-Allow-Headers: Content-Type, Authorization");
  header("Access-Control-Allow-Credentials: true");
  
  if ('OPTIONS' === $_SERVER['REQUEST_METHOD']) {
    status_header(200);
    exit();
  }
}
add_action('init', 'add_cors_http_header');
```

4. 保存文件并关闭编辑器

### 7. 修改React应用中的API配置

1. 在本地React项目中，找到`src/utils/wordpress-api.ts`文件
2. 修改`API_BASE_URL`常量，将其设置为您的WordPress网站的REST API基础URL：

```typescript
// 修改为您的WordPress网站的REST API URL
const API_BASE_URL = 'https://your-wordpress-site.com/wp-json/wp/v2';
```

3. 重新构建React应用：
```bash
pnpm run build
```
4. 将更新后的构建文件重新上传到宝塔面板上的网站目录

### 8. 验证部署和对接

1. 打开浏览器，访问您的主域名（如`bagusnya.com`）
2. 检查React前端应用是否正常加载
3. 测试数据获取功能，确保能够从WordPress REST API获取数据
4. 测试表单提交功能，确保能够将数据提交到WordPress

### 9. 常见问题与解决方案

1. **React应用无法访问WordPress API**
   - 检查CORS配置是否正确
   - 确认WordPress REST API插件已正确安装并启用
   - 使用浏览器开发工具检查网络请求和错误信息

2. **API请求返回404或403错误**
   - 确认REST API端点URL正确
   - 检查WordPress的固定链接设置
   - 确认用户权限设置正确

3. **部署后页面样式错乱**
   - 确保所有静态资源文件正确上传
   - 检查CSS和JavaScript文件的引用路径
   - 清除浏览器缓存后重新加载页面

4. **性能优化建议**
   - 在宝塔面板中配置Nginx静态资源缓存
   - 为网站配置CDN加速
   - 优化React应用的打包配置，减小文件体积

通过本指南，您应该能够成功地将React前端应用部署到宝塔面板，并与WordPress 6.8.3后台实现无缝对接。如果在部署过程中遇到任何问题，请参考宝塔面板的官方文档或联系技术支持。