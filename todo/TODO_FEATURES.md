# TODO Features - Converge Omnichannel Chat Platform

## Project Overview

**Converge** - แพลตฟอร์มรวมแชทและ AI Chatbot สำหรับธุรกิจ  
**Tech Stack**: Next.js 14+ (App Router), Tailwind CSS, Zustand, Supabase  
**Architecture**: Clean Architecture, SOLID Principles, Atomic Design

---

## 📋 Implementation Phases

### ✅ Phase 0: Foundation Setup

- [x] Project initialization
- [x] Next.js 14+ setup with App Router
- [x] Tailwind CSS configuration
- [x] TypeScript configuration
- [x] ESLint configuration
- [x] Supabase setup
- [ ] Environment variables setup
- [ ] Theme system (Light/Dark mode)
- [ ] Zustand store setup
- [ ] Basic folder structure (Clean Architecture)

---

### 🚀 Phase 1: MVP (Core Features)

#### 1.1 Authentication & User Management

- [ ] **Email/Password Authentication**
  - [ ] Sign up page
  - [ ] Login page
  - [ ] Password reset flow
  - [ ] Email verification
  - [ ] Session management
- [ ] **Social Login**
  - [ ] Google OAuth integration
  - [ ] Facebook OAuth integration
- [ ] **User Profile**

  - [ ] View profile page
  - [ ] Edit profile page
  - [ ] Avatar upload
  - [ ] Account settings

- [ ] **Team Management**
  - [ ] Create team
  - [ ] Invite team members
  - [ ] Role-based access control (Admin, Agent, Viewer)
  - [ ] Team member list
  - [ ] Remove team members
  - [ ] Activity logs

#### 1.2 Basic Inbox (Single Channel)

- [ ] **Conversation Management**
  - [ ] Conversation list view
  - [ ] Conversation detail view
  - [ ] Message thread display
  - [ ] Mark as read/unread
  - [ ] Conversation status (open/closed/pending)
- [ ] **Message Handling**
  - [ ] Send text messages
  - [ ] Receive text messages
  - [ ] Real-time message sync
  - [ ] Typing indicators
  - [ ] Read receipts
- [ ] **Customer Profiles**
  - [ ] Customer information sidebar
  - [ ] Customer name and contact
  - [ ] Customer avatar
  - [ ] Conversation history
  - [ ] Custom notes on customers

#### 1.3 Database Setup

- [ ] **Core Tables**

  - [ ] users table (Supabase Auth)
  - [ ] user_profiles table
  - [ ] teams table
  - [ ] team_members table
  - [ ] conversations table
  - [ ] messages table
  - [ ] customers table
  - [ ] channels table

- [ ] **Realtime Features**
  - [ ] Supabase Realtime setup
  - [ ] Message subscriptions
  - [ ] Typing indicators
  - [ ] Online status

---

### 🔧 Phase 2: Multi-Channel Integration

#### 2.1 Channel Integrations

- [ ] **Facebook Messenger**
  - [ ] Connect/disconnect flow
  - [ ] OAuth authentication
  - [ ] Receive messages
  - [ ] Send messages
  - [ ] Webhook setup
- [ ] **Instagram Direct**
  - [ ] Connect/disconnect flow
  - [ ] OAuth authentication
  - [ ] Receive messages
  - [ ] Send messages
  - [ ] Media handling
- [ ] **LINE Official Account**
  - [ ] Connect/disconnect flow
  - [ ] API authentication
  - [ ] Receive messages
  - [ ] Send messages
  - [ ] Rich message support
- [ ] **WhatsApp Business**
  - [ ] Connect/disconnect flow
  - [ ] API authentication
  - [ ] Receive messages
  - [ ] Send messages
  - [ ] Media handling
- [ ] **Website Live Chat Widget**
  - [ ] Widget creation
  - [ ] Widget customization (colors, position, avatar)
  - [ ] Embed code generation
  - [ ] Real-time messaging
  - [ ] Pre-chat form
  - [ ] Offline message form

#### 2.2 Advanced Inbox Features

- [ ] **Multi-Channel Inbox**
  - [ ] Unified message list across all channels
  - [ ] Channel filter dropdown
  - [ ] Channel-specific message format handling
  - [ ] Channel source indicator
- [ ] **Conversation Assignment**
  - [ ] Assign conversations to agents
  - [ ] Transfer conversations between agents
  - [ ] Auto-assignment rules
  - [ ] Agent status (online/away/busy)
- [ ] **Message Features**
  - [ ] Send/receive images
  - [ ] Send/receive files
  - [ ] Send/receive voice messages
  - [ ] Message templates
  - [ ] Quick replies
  - [ ] Emoji support
  - [ ] Message reactions
- [ ] **Search & Filter**
  - [ ] Search conversations
  - [ ] Filter by status
  - [ ] Filter by channel
  - [ ] Filter by agent
  - [ ] Date range filter

#### 2.3 Tags & Labels

- [ ] **Customer Tags**
  - [ ] Create tags
  - [ ] Edit tags
  - [ ] Delete tags
  - [ ] Apply tags to customers
  - [ ] Tag-based filtering
- [ ] **Customer Segments**
  - [ ] Create segments
  - [ ] Segment rules
  - [ ] Saved segments
  - [ ] Segment-based filtering

#### 2.4 Basic Analytics

- [ ] **Dashboard Overview**
  - [ ] Total conversations
  - [ ] New conversations today
  - [ ] Average response time
  - [ ] Messages sent/received
  - [ ] Active conversations
- [ ] **Conversation Analytics**
  - [ ] Conversation volume by channel
  - [ ] Peak hours analysis
  - [ ] Conversation trends
  - [ ] Resolution time
- [ ] **Agent Performance**
  - [ ] Messages sent per agent
  - [ ] Average response time per agent
  - [ ] Conversations handled
  - [ ] Agent online time

---

### 🤖 Phase 3: Automation & AI

#### 3.1 Basic Automations

- [ ] **Auto-Responses**
  - [ ] Auto-welcome messages
  - [ ] Auto-reply for off-hours
  - [ ] Away messages
  - [ ] Keyword-based auto-responses
- [ ] **Quick Reply Templates**
  - [ ] Create templates
  - [ ] Edit templates
  - [ ] Delete templates
  - [ ] Use templates in conversations
- [ ] **Auto-Assignment Rules**
  - [ ] Route by keyword
  - [ ] Route by channel
  - [ ] Route by time/availability
  - [ ] Load balancing across agents

#### 3.2 Flow Builder (No-Code Automation)

- [ ] **Flow Builder Interface**
  - [ ] Visual drag-and-drop canvas
  - [ ] Node palette
  - [ ] Connection drawing
  - [ ] Canvas zoom/pan
- [ ] **Node Types**
  - [ ] Trigger Node (new message, keyword, button click)
  - [ ] Message Node
  - [ ] Question Node (with buttons)
  - [ ] Condition Node (if/else logic)
  - [ ] Action Node (assign agent, add tag, update customer)
  - [ ] Delay Node
  - [ ] API Webhook Node
  - [ ] AI Response Node
  - [ ] Human Handoff Node
- [ ] **Flow Management**
  - [ ] Save flows
  - [ ] Activate/deactivate flows
  - [ ] Duplicate flows
  - [ ] Delete flows
  - [ ] Flow testing interface
  - [ ] Flow analytics

#### 3.3 AI Chatbot Integration

- [ ] **AI Training**
  - [ ] Upload training documents (PDF, text)
  - [ ] Add website URLs for knowledge base
  - [ ] Custom Q&A pairs
  - [ ] Product catalog integration
  - [ ] Training data management
- [ ] **AI Chatbot Features**
  - [ ] Natural language understanding
  - [ ] Context-aware responses
  - [ ] Multi-turn conversations
  - [ ] FAQ answering
  - [ ] Product recommendations
  - [ ] Lead qualification
  - [ ] Sentiment analysis
- [ ] **Human Handoff**
  - [ ] Auto-detect when AI can't answer
  - [ ] Smooth transfer to human agent
  - [ ] Conversation context preservation
  - [ ] Handoff trigger rules
  - [ ] Fallback responses
- [ ] **AI Settings**
  - [ ] Enable/disable AI per channel
  - [ ] AI response tone settings
  - [ ] Response length preferences
  - [ ] Confidence threshold
  - [ ] Business hours for AI
  - [ ] AI escalation rules

#### 3.4 Broadcast Campaigns

- [ ] **Campaign Creation**
  - [ ] Rich message composer
  - [ ] Image/media upload
  - [ ] Button support
  - [ ] Campaign templates
  - [ ] Campaign scheduling
  - [ ] Test before sending
- [ ] **Audience Segmentation**
  - [ ] Segment by tags
  - [ ] Segment by behavior
  - [ ] Segment by channel
  - [ ] Segment by last interaction
  - [ ] Custom segment rules
  - [ ] Audience size estimation
- [ ] **Campaign Management**
  - [ ] Campaign list view
  - [ ] Campaign status (draft/scheduled/sent)
  - [ ] Cancel scheduled campaigns
  - [ ] Pause/resume campaigns
  - [ ] Campaign duplication
- [ ] **Campaign Analytics**
  - [ ] Messages sent
  - [ ] Delivery rate
  - [ ] Open rate
  - [ ] Click-through rate
  - [ ] Response rate
  - [ ] Conversion rate

#### 3.5 Advanced Analytics

- [ ] **Customer Insights**
  - [ ] New vs returning customers
  - [ ] Customer lifetime value
  - [ ] Customer segments analysis
  - [ ] Most active customers
  - [ ] Customer satisfaction scores
  - [ ] Churn indicators
- [ ] **AI Performance**
  - [ ] AI resolution rate
  - [ ] AI accuracy score
  - [ ] Human handoff rate
  - [ ] AI response time
  - [ ] Most common queries
  - [ ] Failed queries analysis
- [ ] **Reports**
  - [ ] Custom date range selection
  - [ ] Export to CSV/PDF
  - [ ] Scheduled reports
  - [ ] Report templates
  - [ ] Visual charts and graphs
  - [ ] Period over period comparison

---

### 🏢 Phase 4: Enterprise Features

#### 4.1 E-commerce Integrations

- [ ] **Shopify Integration**
  - [ ] Order sync
  - [ ] Product catalog sync
  - [ ] Customer data sync
  - [ ] Order status updates in chat
- [ ] **WooCommerce Integration**
  - [ ] Order sync
  - [ ] Product catalog sync
  - [ ] Customer data sync
- [ ] **Marketplace Integrations**
  - [ ] Shopee Chat integration
  - [ ] Lazada Chat integration
  - [ ] TikTok Shop integration
  - [ ] Order sync from marketplaces

#### 4.2 CRM Integrations

- [ ] **HubSpot Integration**
  - [ ] Contact sync
  - [ ] Lead creation
  - [ ] Activity logging
  - [ ] Deal tracking
- [ ] **Salesforce Integration**
  - [ ] Contact sync
  - [ ] Lead creation
  - [ ] Activity logging
- [ ] **Zoho CRM Integration**
  - [ ] Contact sync
  - [ ] Lead creation

#### 4.3 Other Integrations

- [ ] **Google Sheets Webhook**
  - [ ] Export data to sheets
  - [ ] Trigger actions from sheets
- [ ] **Slack Notifications**
  - [ ] Send notifications to Slack
  - [ ] Channel configuration
- [ ] **Zapier Integration**
  - [ ] Create Zapier app
  - [ ] Trigger events
- [ ] **Custom Webhooks**
  - [ ] Webhook management
  - [ ] Event subscription
  - [ ] Webhook logs

#### 4.4 Mobile Apps

- [ ] **iOS App**
  - [ ] Full inbox access
  - [ ] Push notifications
  - [ ] Quick replies
  - [ ] Offline mode
  - [ ] Voice messages
  - [ ] Camera integration
- [ ] **Android App**
  - [ ] Full inbox access
  - [ ] Push notifications
  - [ ] Quick replies
  - [ ] Offline mode
  - [ ] Voice messages
  - [ ] Camera integration

#### 4.5 Advanced Features

- [ ] **API for Developers**
  - [ ] REST API documentation
  - [ ] API keys management
  - [ ] Rate limiting
  - [ ] Webhook documentation
  - [ ] SDK (JavaScript, Python)
- [ ] **Advanced Security**
  - [ ] End-to-end encryption
  - [ ] Two-factor authentication
  - [ ] IP whitelisting
  - [ ] Audit logs
  - [ ] GDPR compliance tools
- [ ] **Enterprise Admin**
  - [ ] Multi-workspace management
  - [ ] SSO (Single Sign-On)
  - [ ] Advanced permissions
  - [ ] Dedicated account manager
  - [ ] Custom integrations

---

## 🎨 UI/UX Components

### Main Navigation

- [ ] Dashboard
- [ ] Inbox
- [ ] Automations
- [ ] AI Agent
- [ ] Analytics
- [ ] Broadcast
- [ ] Customers
- [ ] Settings

### Header Components

- [ ] Logo
- [ ] Global search
- [ ] Notifications dropdown
- [ ] User menu
- [ ] Theme toggle (Light/Dark)

### Common Components

- [ ] Loading states
- [ ] Error states
- [ ] Empty states
- [ ] Modals
- [ ] Dropdowns
- [ ] Date pickers
- [ ] Toast notifications
- [ ] Confirmation dialogs

### Responsive Design

- [ ] Mobile layout (< 768px)
- [ ] Tablet layout (768px - 1024px)
- [ ] Desktop layout (> 1024px)

---

## 📄 Pages to Create

### Public Pages

- [ ] Landing page
- [ ] Pricing page
- [ ] Features page
- [ ] Help center
- [ ] Blog
- [ ] Contact us
- [ ] Demo booking

### Authentication Pages

- [ ] Sign up
- [ ] Login
- [ ] Forgot password
- [ ] Reset password
- [ ] Email verification

### Dashboard Pages

- [ ] Dashboard overview
- [ ] Inbox
- [ ] Conversation detail
- [ ] Automations list
- [ ] Flow builder
- [ ] AI Agent dashboard
- [ ] AI Training
- [ ] Analytics dashboard
- [ ] Broadcast campaigns
- [ ] Campaign builder
- [ ] Customer list
- [ ] Customer detail
- [ ] Settings
  - [ ] Account settings
  - [ ] Team settings
  - [ ] Channel integrations
  - [ ] Billing & subscription
  - [ ] Notifications
  - [ ] API keys

---

## 🗃️ Database Schema

### Core Tables (Supabase)

- [ ] users (via Supabase Auth)
- [ ] user_profiles
- [ ] teams
- [ ] team_members
- [ ] roles
- [ ] permissions
- [ ] channels
- [ ] channel_integrations
- [ ] conversations
- [ ] messages
- [ ] customers
- [ ] customer_tags
- [ ] tags
- [ ] conversation_assignments
- [ ] conversation_notes
- [ ] automations
- [ ] automation_flows
- [ ] flow_nodes
- [ ] flow_connections
- [ ] flow_executions
- [ ] flow_logs
- [ ] ai_configs
- [ ] ai_training_data
- [ ] ai_conversations
- [ ] ai_responses
- [ ] ai_handoffs
- [ ] knowledge_base_entries
- [ ] broadcast_campaigns
- [ ] campaign_messages
- [ ] campaign_audiences
- [ ] campaign_segments
- [ ] campaign_analytics
- [ ] campaign_deliveries
- [ ] analytics_events
- [ ] agent_stats
- [ ] conversation_metrics
- [ ] daily_aggregates
- [ ] ai_metrics
- [ ] integrations
- [ ] integration_configs
- [ ] integration_logs
- [ ] synced_orders
- [ ] synced_products
- [ ] widget_settings
- [ ] widget_conversations
- [ ] notifications
- [ ] notification_preferences

---

## 🔐 Security Considerations

- [ ] End-to-end encryption for messages
- [ ] GDPR compliance
- [ ] Data privacy controls
- [ ] Role-based access control (RBAC)
- [ ] Audit logs
- [ ] Secure API authentication
- [ ] Rate limiting
- [ ] XSS protection
- [ ] CSRF protection
- [ ] Input validation
- [ ] SQL injection prevention
- [ ] Secure file upload

---

## 📱 Pricing Plans Implementation

- [ ] Basic Plan ($30/month)
  - [ ] Plan feature limits
  - [ ] Payment integration
- [ ] Pro Plan ($35/month)
  - [ ] Plan feature limits
  - [ ] Payment integration
- [ ] Advanced Plan ($139/month)
  - [ ] Plan feature limits
  - [ ] Payment integration
- [ ] Enterprise Plan (Custom)
  - [ ] Custom pricing
  - [ ] Sales contact form

---

## 🧪 Testing & Quality Assurance

- [ ] Unit tests setup (Jest)
- [ ] Integration tests
- [ ] E2E tests (Playwright/Cypress)
- [ ] API tests
- [ ] Performance testing
- [ ] Security testing
- [ ] Accessibility testing
- [ ] Cross-browser testing
- [ ] Mobile responsiveness testing

---

## 📚 Documentation

- [ ] README.md
- [ ] API documentation
- [ ] Component documentation (Storybook)
- [ ] User guide
- [ ] Admin guide
- [ ] Developer guide
- [ ] Deployment guide
- [ ] Troubleshooting guide

---

## 🚀 Deployment & DevOps

- [ ] Vercel deployment setup
- [ ] Environment variables management
- [ ] CI/CD pipeline
- [ ] Monitoring setup (Sentry)
- [ ] Analytics setup (Google Analytics)
- [ ] Performance monitoring
- [ ] Error tracking
- [ ] Log management

---

## 📝 Notes

- Follow Clean Architecture pattern for all new pages
- Use SOLID principles
- Implement Atomic Design for components
- Use TypeScript strictly
- Follow the CREATE_PAGE_PATTERN.md for all page.tsx files
- Use Zustand for state management
- Use Supabase for backend
- Implement dark mode support everywhere
- Make all components responsive
- Add proper error handling
- Add loading states
- Add empty states
- Write clean, maintainable code

---

**Last Updated**: November 22, 2025  
**Project Status**: Phase 0 - Foundation Setup
