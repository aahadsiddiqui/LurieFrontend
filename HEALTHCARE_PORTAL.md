# Lurie AI Healthcare Portal

A modern, sleek healthcare AI portal inspired by Microsoft 365 Copilot's design, specifically tailored for healthcare organizations.

## 🎨 Design Features

### Visual Design
- **Clean, minimal interface** with white/gray backgrounds
- **Healthcare-inspired color palette** with accent blues and teals
- **Medical icons** (stethoscope, heart, activity, shield) throughout the UI
- **Smooth animations** and hover interactions
- **Responsive design** for all screen sizes

### Components

#### 1. Healthcare Sidebar
- **Navigation items**: Search, Chat, Agents (expandable), Chats (expandable), Pages, Notebooks, Create, Apps
- **Medical icons** for healthcare context
- **Collapsible design** with smooth animations
- **User avatar and info** at the bottom
- **Responsive** - hidden on mobile, shows hamburger menu

#### 2. Search Bar
- **Centered, prominent search** with healthcare messaging
- **Headline**: "Find insights across your organization"
- **Subtext**: "Search for a patient record, clinical note, or dataset from your organization"
- **Voice and image search** buttons
- **Search suggestions** on focus
- **Healthcare-focused placeholder** text

#### 3. Recommended Cards
- **Healthcare content types**: Patient Episodes, Clinical Trials, Lab Reports, Emergency Protocols
- **Color-coded cards** with medical icons
- **Metadata**: Updated by, tags, timestamps
- **Hover animations** with lift effect
- **Grid layout** responsive to screen size

#### 4. Quick Access
- **Three tabs**: Recent, Shared, Favorites
- **Healthcare file types**: Documents, Spreadsheets, Meetings, Chats
- **Collaborator avatars** and sharing indicators
- **File type icons** with appropriate colors
- **Action buttons** (view, download, more) on hover

## 🏥 Healthcare Content

### Mock Data Examples
- **Patient Episode Summaries** - Cardiology Department
- **Clinical Trial Results** - Oncology Research  
- **Lab Report Analysis** - Pathology Department
- **Emergency Protocols** - Emergency Medicine
- **Pediatric Growth Charts** - Pediatrics Department
- **Medication Interaction Database** - Pharmacy Services

### File Types
- Discharge Summaries
- Growth Charts (Excel)
- Research Notes
- Care Team Meetings (Teams)
- Clinical Trial Results
- Safety Protocols

## 🚀 Technical Implementation

### Tech Stack
- **Next.js 14** with App Router
- **TypeScript** for type safety
- **Tailwind CSS** for styling
- **Framer Motion** for animations
- **Lucide React** for icons
- **Radix UI** for accessible components

### Key Features
- **Fully responsive** design
- **Smooth animations** and transitions
- **Accessible** components
- **Healthcare-focused** content and messaging
- **Modern UI patterns** inspired by Microsoft Copilot

### File Structure
```
components/
├── layout/
│   ├── HealthcareSidebar.tsx    # Main sidebar navigation
│   └── HealthcareDashboard.tsx  # Main dashboard layout
├── SearchBar.tsx                # Healthcare search interface
├── RecommendedCard.tsx          # Healthcare content cards
└── QuickAccess.tsx             # Quick access tabs and lists

app/(protected)/search/
└── page.tsx                    # Main search page
```

## 🎯 Usage

1. **Navigate to `/search`** to see the healthcare portal
2. **Use the sidebar** to navigate between different sections
3. **Search** for patient records, clinical notes, or research data
4. **Browse recommended** healthcare content
5. **Access recent files** through the quick access section

## 🎨 Design Philosophy

The portal maintains the **clean, professional aesthetic** of Microsoft 365 Copilot while incorporating **healthcare-specific elements**:

- **Medical color palette** (blues, teals, greens)
- **Healthcare terminology** and messaging
- **Medical icons** and imagery
- **Healthcare workflow** considerations
- **Professional, trustworthy** appearance

This creates a familiar yet specialized experience for healthcare professionals using AI-powered tools in their daily work.
