# Discussion File for Solace Engineering Assignment

## Initial Thoughts

Given the simplicity of the application, I'd imagine it would be used as a section or module of a larger app, which would provide more data resources and frameworks. I implemented a few things demonstrating this idea:

- An interfaces.ts file to capture the shared data structures used by the components. In a larger application, this would be broken down into logical groups, database, settings, etc. and have an index.ts file to make all imports similar. Right now, I have a single file, but I'd make one for the api and db code as well.

- A data service to be a single source of truth for api calls, src/services/advocateService.ts. This could be expanded to handle additional calls to the database, but there wasn't much more time. But what is important here is that by wrapping the data calls in a service, the app won't always have to be updated if/when the backend changes.

I didn't implement a number of architectural details that I normally would have in a new project, again, because of the time limit. However, isolating the key components, features and data handling for better maintainability has been started. _The key philosophy and approach here is that I won't be the last person to look at the code, so making it readable and organized pays for itself over time._

For the AI collaboration, I used Anthropic's Claude Code in a terminal directly in VS Code. This allowed me to have access to the whole code repo. It did a lot of the coding, but all architectural changes, updates, and refactoring were done by prompts and at my direction (no agents). I wrote and edited some of the code, but due to time constraints, I was able to accomplish far more by leveraging the AI.

## Technical Discussion: Data Storage and Performance Optimizations

### Current Implementation

The application currently uses **client-side React state** for data storage. This allowed me to search the stored data without making additional api calls. In other applications, building out the advocateService.ts to handle different queries, searches, and other CRUD-related calls would be straightforward.

#### Current Data Flow

1. Page loads → `useEffect` triggers
2. Fetch all advocates from `/api/advocates`
3. Store in React state (in-memory, client-side)
4. Filter locally using string matching

#### Limitations of Current Approach

- **Component-scoped data:** Data is lost when navigating away from the page
- **Re-fetching on every visit:** No persistence between page loads
- **No shared state:** Other components can't access advocate data

### Client-Side State Management with React Context

#### Global State Management

For applications where advocate data doesn't change frequently, implementing a global context can improve performance and user experience:

#### Benefits of Context Approach

**Performance Benefits:**

- **Single data fetch:** Load advocate data once per session
- **Persistent state:** Data retained when navigating between pages
- **Reduced API calls:** No re-fetching on page revisits
- **Shared filtering state:** Search terms persist across navigation

**User Experience Benefits:**

- **Faster page loads:** No loading spinner on subsequent visits
- **Maintained search state:** Users don't lose their search progress
- **Consistent data:** All components use the same dataset

**For Advocate Data Specifically:**

- **Low change frequency:** Advocate profiles rarely change during a user session
- **Reference data:** Acts as a lookup table that benefits from caching
- **Small dataset size:** Current advocate list easily fits in memory

### Database/Server-Side Optimization Ideas

#### 1. Server-Side Search with SQL Full-Text Search

**Current Problem:** All data is loaded client-side and filtered with JavaScript. It works well with small, uncomplicated data, but doesn't always scale appropriately.
**Solution:** Move search to the database layer

**Benefits:**

- Faster search on large datasets
- Relevance ranking
- Reduced client-side memory usage
- Better scalability
- **Always current data:** Each query fetches the latest data from the database, ensuring users see real-time updates rather than stale cached data from page initialization

#### 2. Pagination and Lazy Loading

**Current Problem:** All advocates are loaded at once
**Solution:** Implement server-side pagination

**Benefits:**

- Reduced initial load time
- Lower memory usage
- Better user experience on large datasets
- **Fresh data on every page load:** Users always see the most current advocate information

#### Data Freshness Considerations

**Client-Side Caching vs. Server-Side Polling Trade-offs:**

**For Advocate Data Specifically:**

- **Low update frequency:** Advocate profiles, specialties, and contact info rarely change
- **Acceptable staleness:** 15-30 minute old data is typically acceptable
- **Context-dependent:** Search/browse can use cached data, booking flows need fresh availability

#### Conclusion

While the current client-side approach works well for the current dataset size, implementing server-side search with proper indexing and caching would provide better scalability and user experience as the application and data grow.
