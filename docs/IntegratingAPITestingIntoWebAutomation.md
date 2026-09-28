🚀 Integrating API Testing into Web Automation

Goal: Don't use API testing only to test APIs.
Use APIs to make your web automation faster, more stable, and
smarter.

🎯 The Big Idea

Modern web applications are heavily driven by APIs.

When we interact with a web application:

User
  ↓
Web UI
  ↓
API Request
  ↓
Backend / API Server
  ↓
API Response
  ↓
Web UI renders the response

The browser is often just the front-end layer.

For example, when we enter:

Email: user@example.com
Password: ********

the browser sends a request to the backend.

The request may contain a JSON payload such as:

{
  "email": "user@example.com",
  "password": "********"
}

The API server processes the request and sends a response.

A successful login response may contain a token:

{
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "user": {
    "id": 123,
    "name": "Test User"
  }
}

The application then uses this token to maintain the authenticated
session.

🧠 API Testing + UI Automation

We are not saying that API testing should replace UI testing.

Instead:

Use API calls to prepare the application state, and use UI
automation to validate the user experience.

This combination can make automation:

⚡ Faster

🛡️ More stable

🔄 Easier to maintain

🧹 Less dependent on repetitive UI steps

🚀 More scalable

🔐 Understanding Login Authentication

Let's understand what happens during a normal login.

Step 1 --- User enters credentials

The user enters:

Email
Password

and clicks:

Login

Step 2 --- Browser sends an API request

The frontend sends the credentials to the backend.

Example:

POST /api/login

Request payload:

{
  "email": "user@example.com",
  "password": "password123"
}

Step 3 --- API returns a token

The server validates the credentials.

If authentication succeeds, the API may return:

{
  "token": "abc123xyz",
  "userId": "101",
  "username": "testuser"
}

The important part for our automation is:

token

💾 Where Does the Token Go?

The frontend application can store authentication information in browser
storage.

For example:

Application
   ↓
Local Storage / Session Storage
   ↓
Application URL
   ↓
token = abc123xyz

The exact mechanism depends on how the application is implemented.

Authentication may use:

Cookies

Local Storage

Session Storage

Authorization headers

Other application-specific mechanisms

Important

Do not assume every application stores its authentication token in Local
Storage.

Always inspect the application to understand its actual authentication
mechanism.

🌐 How Does the Browser Know We Are Logged In?

Imagine we successfully logged in.

The browser now has authentication state such as:

Cookie
Token
Session information

When we navigate to another page, the browser automatically sends the
relevant authentication information with requests.

Therefore:

Login once
   ↓
Authentication state created
   ↓
Open another page
   ↓
Browser sends authentication state
   ↓
Application recognizes the user

That is why we can open another page without entering the username and
password again.

🪟 New Tab Example

Suppose we are already logged in.

We open a new browser tab.

Tab 1
Logged in
   ↓
Open Tab 2
   ↓
Same browser context
   ↓
Authentication state may be available

The new tab can use the same browser context's cookies and storage,
depending on how the application and browser context are configured.

So when we directly navigate to:

https://example.com/orders

the application can recognize the existing authentication state.

🕵️ Incognito / New Browser Context

Now imagine opening the same application in a fresh private/incognito
context.

There is no existing authentication state.

Fresh Browser Context
       ↓
No existing cookies
No existing storage
No existing session
       ↓
Open Application
       ↓
Login required

This demonstrates an important automation concept:

Authentication state belongs to the browser context/session, not
simply to the URL.

🔑 Token Injection Concept

Suppose we already have a valid test-user token.

Instead of performing the complete login flow through the UI, automation
can potentially:

Call the login API.

Receive the authentication response.

Extract the required authentication information.

Establish the authentication state in the browser context.

Navigate directly to the required application page.

Start the actual test.

Conceptually:

Playwright
    ↓
Login API
    ↓
Response
    ↓
Extract token / auth state
    ↓
Set browser authentication state
    ↓
Open application
    ↓
Already authenticated
    ↓
Start test

⚡ Why Do This?

Imagine we have:

50 UI test cases

and every test performs:

Open application
   ↓
Load login page
   ↓
Enter email
   ↓
Enter password
   ↓
Click Login
   ↓
Wait for dashboard
   ↓
Start actual test

The actual test might be:

Create Order

Why should every test repeatedly execute the complete login UI flow?

We can have one dedicated login test that thoroughly validates login.

For the remaining tests, we can establish authentication
programmatically.

⏱️ Execution-Time Example

Traditional UI approach

Test 1 → Login UI → Test
Test 2 → Login UI → Test
Test 3 → Login UI → Test
...
Test 50 → Login UI → Test

Every test repeatedly performs the same UI steps.

API-assisted approach

Login API
    ↓
Create authentication state
    ↓
Test 1 → Create Order
Test 2 → View Order
Test 3 → Update Order
Test 4 → Delete Order
...
Test 50 → Another business scenario

The exact time saved depends on the application, environment, network,
authentication mechanism, and test architecture.

The key benefit is:

Remove unnecessary repeated UI work from tests whose purpose is not
to test login.

🏗️ Robust Automation Architecture

A useful architecture is:

                 ┌──────────────────┐
                 │   Login API      │
                 └────────┬─────────┘
                          ↓
                 ┌──────────────────┐
                 │ Authentication   │
                 │     State        │
                 └────────┬─────────┘
                          ↓
                 ┌──────────────────┐
                 │ Playwright       │
                 │ Browser Context  │
                 └────────┬─────────┘
                          ↓
              ┌───────────────────────┐
              │   Application UI      │
              └───────────┬───────────┘
                          ↓
                 Business Test

The API prepares the state.

The UI validates the behavior.

🧪 Example: Create an Order

Suppose the goal of a test is:

Create a new order.

Traditional approach

Open URL
   ↓
Login
   ↓
Enter email
   ↓
Enter password
   ↓
Click Login
   ↓
Wait for Dashboard
   ↓
Open Orders
   ↓
Create Order

API-assisted approach

Call Login API
   ↓
Get authentication response
   ↓
Create authenticated browser state
   ↓
Open Orders page
   ↓
Create Order

Now the test is focused on what it actually needs to validate:

Create Order

🧩 Playwright Supports API Requests

Playwright provides API request capabilities that can be used alongside
browser automation.

A simple example:

const response = await request.post('/api/login', {
    data: {
        email: 'test@example.com',
        password: 'password123'
    }
});

const responseBody = await response.json();

console.log(responseBody);

The exact URL, payload, headers, and authentication mechanism depend on
the application.

🔄 API + UI Workflow

A common automation flow can look like this:

// 1. Call login API
const response = await request.post('/api/login', {
    data: {
        email: 'test@example.com',
        password: 'password123'
    }
});

// 2. Read API response
const responseBody = await response.json();

// 3. Extract authentication information
const token = responseBody.token;

// 4. Use the authentication information
// to establish the browser's authenticated state.

// 5. Navigate directly to the application
await page.goto('/dashboard');

Note: The exact way to establish authentication depends on whether
the application uses cookies, Local Storage, Session Storage, headers,
or another mechanism.

🍪 Cookies vs Storage

Do not automatically assume:

Authentication = Local Storage

Different applications use different approaches.

Cookie-based authentication

Login API
   ↓
Set-Cookie
   ↓
Browser stores cookie
   ↓
Cookie sent with requests

Token + Storage

Login API
   ↓
Token
   ↓
Local Storage / Session Storage
   ↓
Frontend uses token

Authorization Header

Some applications use:

Authorization: Bearer <token>

So before implementing API-assisted authentication, inspect the
application's actual authentication flow.

🔍 How to Investigate Authentication

Use browser developer tools.

Network tab

Look for the login request:

Network
   ↓
Login request
   ↓
Request
   ↓
Payload
   ↓
Response

Check:

Request

URL

HTTP method

Headers

Request payload

Cookies

Response

Status code

Response body

Token

User information

Set-Cookie headers

🗄️ Application Tab

The browser's Application/Storage section can help you inspect
client-side state.

Look for:

Application
├── Local Storage
├── Session Storage
└── Cookies

You may find something like:

Key              Value
--------------------------------
token            abc123xyz

Again, this is application-specific.

🧠 The Main Automation Principle

A good automation engineer asks:

"Do I really need to perform this action through the UI?"

If the test is not testing login, perhaps login can be handled through
an API or reusable authentication state.

If the test needs test data, perhaps the data can be created through an
API.

If the test needs an existing order, perhaps an API can create the order
before the UI test starts.

This is where API testing becomes a powerful automation support
mechanism.

🛠️ API Can Prepare Test Data Too

Authentication is only one example.

Suppose the UI test needs:

Existing Customer
Existing Product
Existing Order
Existing Payment

Instead of manually creating everything through the UI:

UI → Customer
UI → Product
UI → Order
UI → Payment

we may be able to use APIs:

API → Create Customer
API → Create Product
API → Create Order
API → Create Payment
        ↓
      UI Test

Then the UI test can start from the state it actually needs.

🎯 Test Design Example

Scenario

Verify that an existing customer can view an order.

❌ UI-heavy approach

Login
   ↓
Create Customer
   ↓
Create Product
   ↓
Create Order
   ↓
Search Customer
   ↓
Open Order
   ↓
Verify Order

This test contains a lot of setup.

✅ API-assisted approach

API → Create Customer
API → Create Product
API → Create Order
API → Authenticate
        ↓
UI → Open Order
        ↓
UI → Verify Order

Now the UI portion is focused on the behavior being tested.

🧱 Separate Test Setup from Test Validation

A useful mindset:

SETUP
  ↓
API

VALIDATION
  ↓
UI

For example:

API
 ↓
Create test user
 ↓
Create order
 ↓
Authenticate
 ↓
UI
 ↓
Open order
 ↓
Verify displayed information

This separation can make tests easier to understand and maintain.

🚦 When Should We Still Test Login Through UI?

We should not remove the login UI test completely.

Keep dedicated UI tests for scenarios such as:

Login page is displayed correctly.

User can enter credentials.

Login button works.

Validation messages appear.

Invalid credentials are handled correctly.

Successful login redirects correctly.

Authentication-related UI behavior works correctly.

But a test such as:

"Create Order"

does not necessarily need to repeat the entire login UI flow if
authentication is not what that test is validating.

⚠️ Important Security & Stability Notes

Never hard-code real credentials or production tokens in automation
code.

Avoid:

const password = "MyRealPassword123";

Use:

Environment variables

Secret management

Test accounts

CI/CD secrets

Secure configuration

Also remember:

A token can expire.

Therefore, automation should be designed to obtain fresh authentication
state when necessary.

🧠 The "Smart Automation" Formula

Think of modern automation like this:

        API
         ↓
  Prepare the state
         ↓
     Playwright
         ↓
   Validate the UI

Instead of:

Everything through UI
         ↓
Slow setup
         ↓
More waiting
         ↓
More points of failure

🏆 Interview Point

If asked:

"How can API testing be integrated with UI automation?"

A strong answer:

"I would use API calls not only for API validation but also to prepare
the application state for UI tests. For example, instead of logging in
through the UI for every test, I can call the login API, obtain the
required authentication information, establish the browser's
authenticated state, and then navigate directly to the page under
test. Similarly, APIs can be used to create test data such as
customers or orders. This reduces unnecessary UI steps, can improve
execution time and stability, and allows UI tests to focus on the
actual business behavior being validated."

📌 Key Takeaways

API testing is not only about testing APIs.

It can also help us:

✅ Authenticate users
✅ Create test data
✅ Prepare application state
✅ Reduce repetitive UI steps
✅ Reduce unnecessary waiting
✅ Make UI tests more focused
✅ Improve maintainability
✅ Support scalable automation

Remember

API = Prepare
UI  = Validate

Or simply:

"Use APIs to get the application ready. Use the UI to verify what
the user sees and does."

🚀 Final Mental Model

                 MODERN TEST AUTOMATION

                         │
             ┌───────────┴───────────┐
             │                       │
            API                     UI
             │                       │
      Prepare the state        Validate behavior
             │                       │
      ┌──────┼──────┐                │
      │      │      │                │
   Login   Data   Setup              │
      │      │      │                │
      └──────┴──────┘                │
             │                       │
             └───────────┬───────────┘
                         ↓
                 ROBUST TEST CASE

The goal is not to automate more steps.
The goal is to automate the right steps.