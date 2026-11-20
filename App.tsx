import React, { useState } from "react";
import {
  Menu,
  X,
  ArrowRight,
  CheckCircle2,
  Users,
  FileText,
  MessageSquare,
  TrendingUp,
  BarChart3,
  Search,
  Bell,
  Settings,
  Moon,
  Sun,
  Calendar,
  LayoutDashboard,
  FolderKanban,
  UserCircle2,
  LogOut,
  Plus,
  ChevronRight,
  Clock,
  Paperclip,
  Send,
  Video,
  Star,
  Download,
  Eye,
  EyeOff,
  Mail,
  Lock,
  Github,
  Chrome,
  Filter,
  MoreVertical,
  Circle,
  AlertCircle,
  Trophy,
  Target,
  Zap,
  Activity,
  TrendingDown,
  Upload,
  Shield,
  Ban,
  Check,
  XCircle,
  Edit2,
  Trash2,
  Archive,
  Database,
  RefreshCw,
  Key,
  AlertTriangle,
  DollarSign,
  UserCheck,
  UserX,
  Briefcase,
  PieChart,
  LineChart,
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

// Types
type AdminUser = {
  id: string;
  name: string;
  email: string;
  role: "Admin" | "User";
  status: "Active" | "Suspended";
  avatar: string;
  projects: number;
  joinedDate: string;
};

type AdminProject = {
  id: string;
  name: string;
  owner: string;
  team: string;
  status: "Pending" | "Approved" | "Rejected" | "Archived";
  createdDate: string;
  members: number;
  progress: number;
};

type Report = {
  id: string;
  type: "Project" | "User" | "Spam";
  reportedBy: string;
  reportedItem: string;
  reason: string;
  date: string;
  status: "Pending" | "Resolved" | "Dismissed";
};

type Team = {
  id: string;
  name: string;
  leader: string;
  members: number;
  projects: number;
  status: "Active" | "Inactive";
  createdDate: string;
};

// Types for data structures
type Project = {
  id: string;
  title: string;
  description: string;
  budget: string;
  category: string;
  deadline: string;
  status: "Active" | "Pending" | "Completed" | "In Progress";
  progress: number;
  ownerId: string;
  ownerName: string;
  makerId?: string;
  makerName?: string;
  applicants: number;
  postedDate: string;
  skills: string[];
};

type Bid = {
  id: string;
  projectId: string;
  projectTitle: string;
  makerId: string;
  makerName: string;
  amount: string;
  proposal: string;
  status: "Pending" | "Accepted" | "Rejected";
  submittedDate: string;
};

type Message = {
  id: string;
  senderId: string;
  senderName: string;
  recipientId: string;
  content: string;
  timestamp: string;
};

type Conversation = {
  id: string;
  participantId: string;
  participantName: string;
  participantAvatar: string;
  lastMessage: string;
  lastMessageTime: string;
  unread: number;
  messages: Message[];
};

type Review = {
  id: string;
  projectId: string;
  projectTitle: string;
  reviewerId: string;
  reviewerName: string;
  revieweeId: string;
  revieweeName: string;
  rating: number;
  comment: string;
  date: string;
};

type Toast = {
  id: string;
  message: string;
  type: "success" | "error" | "info";
};

export default function App() {
  const [currentPage, setCurrentPage] = useState<
    | "landing"
    | "login"
    | "signup"
    | "dashboard"
    | "post-project"
    | "my-projects"
    | "browse-makers"
    | "customer-messages"
    | "customer-payments"
    | "customer-reviews"
    | "customer-settings"
    | "project"
    | "team"
    | "profile"
    | "active-projects"
    | "completed-projects"
    | "pending-projects"
    | "maker-dashboard"
    | "available-projects"
    | "my-bids"
    | "active-work"
    | "earnings"
    | "maker-messages"
    | "maker-reviews"
    | "maker-settings"
    | "maker-profile"
    | "admin"
    | "admin-users"
    | "admin-projects"
    | "admin-teams"
    | "admin-moderation"
    | "admin-analytics"
    | "admin-settings"
    | "admin-profile"
  >("landing");
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isMaker, setIsMaker] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const [selectedRole, setSelectedRole] = useState<"customer" | "maker">("customer");
  const [currentUserId, setCurrentUserId] = useState<string>("user-1");
  const [currentUserName, setCurrentUserName] = useState<string>("Sarah Johnson");

  // Data States
  const [projects, setProjects] = useState<Project[]>([
    {
      id: "proj-1",
      title: "E-commerce Website",
      description: "Looking for an experienced developer to build a full-stack e-commerce platform with payment integration, user authentication, and admin dashboard.",
      budget: "$2,500",
      category: "Web Development",
      deadline: "2 weeks",
      status: "Pending",
      progress: 0,
      ownerId: "user-1",
      ownerName: "Sarah Johnson",
      applicants: 8,
      postedDate: "2 hours ago",
      skills: ["React", "Node.js", "MongoDB"],
    },
    {
      id: "proj-2",
      title: "Mobile App UI Design",
      description: "Need a talented designer to create modern app interfaces for iOS and Android with prototypes and design system.",
      budget: "$1,800",
      category: "Design",
      deadline: "1 week",
      status: "In Progress",
      progress: 45,
      ownerId: "user-1",
      ownerName: "Sarah Johnson",
      makerId: "maker-1",
      makerName: "Alex Thompson",
      applicants: 12,
      postedDate: "5 hours ago",
      skills: ["Figma", "UI/UX", "Prototyping"],
    },
    {
      id: "proj-3",
      title: "Logo & Branding Package",
      description: "Creating a new brand identity for a sustainable fashion startup including logo, color palette, and brand guidelines.",
      budget: "$800",
      category: "Design",
      deadline: "3 days",
      status: "Completed",
      progress: 100,
      ownerId: "user-1",
      ownerName: "Sarah Johnson",
      makerId: "maker-2",
      makerName: "Emma Wilson",
      applicants: 15,
      postedDate: "1 day ago",
      skills: ["Illustrator", "Branding", "Design"],
    },
  ]);

  const [bids, setBids] = useState<Bid[]>([
    {
      id: "bid-1",
      projectId: "proj-1",
      projectTitle: "E-commerce Website",
      makerId: "maker-1",
      makerName: "Alex Thompson",
      amount: "$2,200",
      proposal: "I have 5+ years of experience building e-commerce platforms. I can deliver a high-quality solution within your timeline.",
      status: "Pending",
      submittedDate: "2 hours ago",
    },
  ]);

  const [conversations, setConversations] = useState<Conversation[]>([
    {
      id: "conv-1",
      participantId: "maker-1",
      participantName: "Alex Thompson",
      participantAvatar: "👨‍💻",
      lastMessage: "Sounds good! Let's discuss the timeline.",
      lastMessageTime: "2m ago",
      unread: 2,
      messages: [
        {
          id: "msg-1",
          senderId: "maker-1",
          senderName: "Alex Thompson",
          recipientId: "user-1",
          content: "Hi! I'd love to work on your mobile app project.",
          timestamp: "10:30 AM",
        },
        {
          id: "msg-2",
          senderId: "user-1",
          senderName: "Sarah Johnson",
          recipientId: "maker-1",
          content: "Great! Can you share your portfolio?",
          timestamp: "10:32 AM",
        },
        {
          id: "msg-3",
          senderId: "maker-1",
          senderName: "Alex Thompson",
          recipientId: "user-1",
          content: "Sounds good! Let's discuss the timeline.",
          timestamp: "10:35 AM",
        },
      ],
    },
  ]);

  const [reviews, setReviews] = useState<Review[]>([
    {
      id: "rev-1",
      projectId: "proj-3",
      projectTitle: "Logo Design",
      reviewerId: "user-1",
      reviewerName: "Sarah Johnson",
      revieweeId: "maker-2",
      revieweeName: "Emma Wilson",
      rating: 5,
      comment: "Excellent work! Very professional and delivered on time.",
      date: "Dec 15, 2024",
    },
  ]);

  const [toasts, setToasts] = useState<Toast[]>([]);

  // Modal states
  const [showBidModal, setShowBidModal] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [showMessageModal, setShowMessageModal] = useState(false);

  // Helper functions
  const showToast = (message: string, type: "success" | "error" | "info" = "success") => {
    const newToast: Toast = {
      id: Date.now().toString(),
      message,
      type,
    };
    setToasts((prev) => [...prev, newToast]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== newToast.id));
    }, 3000);
  };

  const createProject = (projectData: Omit<Project, "id" | "ownerId" | "ownerName" | "status" | "progress" | "applicants" | "postedDate" | "makerId" | "makerName">) => {
    const newProject: Project = {
      ...projectData,
      id: `proj-${Date.now()}`,
      ownerId: currentUserId,
      ownerName: currentUserName,
      status: "Pending",
      progress: 0,
      applicants: 0,
      postedDate: "Just now",
    };
    setProjects((prev) => [newProject, ...prev]);
    showToast("Project posted successfully!");
    return newProject;
  };

  const submitBid = (projectId: string, amount: string, proposal: string) => {
    const project = projects.find((p) => p.id === projectId);
    if (!project) return;

    const newBid: Bid = {
      id: `bid-${Date.now()}`,
      projectId,
      projectTitle: project.title,
      makerId: currentUserId,
      makerName: currentUserName,
      amount,
      proposal,
      status: "Pending",
      submittedDate: "Just now",
    };
    setBids((prev) => [newBid, ...prev]);
    setProjects((prev) =>
      prev.map((p) => (p.id === projectId ? { ...p, applicants: p.applicants + 1 } : p))
    );
    showToast("Bid submitted successfully!");
  };

  const acceptBid = (bidId: string) => {
    const bid = bids.find((b) => b.id === bidId);
    if (!bid) return;

    setBids((prev) => prev.map((b) => (b.id === bidId ? { ...b, status: "Accepted" as const } : b)));
    setProjects((prev) =>
      prev.map((p) =>
        p.id === bid.projectId
          ? { ...p, status: "In Progress" as const, makerId: bid.makerId, makerName: bid.makerName }
          : p
      )
    );
    showToast("Bid accepted!");
  };

  const sendMessage = (recipientId: string, content: string) => {
    const newMessage: Message = {
      id: `msg-${Date.now()}`,
      senderId: currentUserId,
      senderName: currentUserName,
      recipientId,
      content,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    setConversations((prev) => {
      const existingConv = prev.find((c) => c.participantId === recipientId);
      if (existingConv) {
        return prev.map((c) =>
          c.id === existingConv.id
            ? {
                ...c,
                messages: [...c.messages, newMessage],
                lastMessage: content,
                lastMessageTime: "Just now",
              }
            : c
        );
      }
      return prev;
    });
    showToast("Message sent!");
  };

  const submitReview = (projectId: string, revieweeId: string, revieweeName: string, rating: number, comment: string) => {
    const project = projects.find((p) => p.id === projectId);
    if (!project) return;

    const newReview: Review = {
      id: `rev-${Date.now()}`,
      projectId,
      projectTitle: project.title,
      reviewerId: currentUserId,
      reviewerName: currentUserName,
      revieweeId,
      revieweeName,
      rating,
      comment,
      date: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
    };
    setReviews((prev) => [newReview, ...prev]);
    showToast("Review submitted successfully!");
  };

  // Admin State
  const [adminUsers, setAdminUsers] = useState<AdminUser[]>([
    {
      id: "1",
      name: "Sarah Johnson",
      email: "sarah.j@university.edu",
      role: "User",
      status: "Active",
      avatar: "👩‍💻",
      projects: 12,
      joinedDate: "2024-01-15",
    },
    {
      id: "2",
      name: "Michael Chen",
      email: "michael.c@university.edu",
      role: "User",
      status: "Active",
      avatar: "👨‍🔬",
      projects: 8,
      joinedDate: "2024-02-20",
    },
    {
      id: "3",
      name: "Emma Davis",
      email: "emma.d@university.edu",
      role: "User",
      status: "Suspended",
      avatar: "👩‍🎨",
      projects: 5,
      joinedDate: "2024-03-10",
    },
    {
      id: "4",
      name: "John Smith",
      email: "john.s@university.edu",
      role: "User",
      status: "Active",
      avatar: "👨‍💻",
      projects: 15,
      joinedDate: "2023-11-05",
    },
    {
      id: "5",
      name: "Admin User",
      email: "admin@projectsphere.com",
      role: "Admin",
      status: "Active",
      avatar: "👨‍💼",
      projects: 0,
      joinedDate: "2023-01-01",
    },
  ]);

  const [adminProjects, setAdminProjects] = useState<AdminProject[]>([
    {
      id: "1",
      name: "Mobile App Design",
      owner: "Sarah Johnson",
      team: "UI/UX Team",
      status: "Approved",
      createdDate: "2024-11-01",
      members: 5,
      progress: 75,
    },
    {
      id: "2",
      name: "Website Redesign",
      owner: "Michael Chen",
      team: "Web Development",
      status: "Pending",
      createdDate: "2024-11-15",
      members: 3,
      progress: 45,
    },
    {
      id: "3",
      name: "Marketing Campaign",
      owner: "Emma Davis",
      team: "Marketing",
      status: "Approved",
      createdDate: "2024-10-20",
      members: 6,
      progress: 90,
    },
    {
      id: "4",
      name: "AI Integration Project",
      owner: "John Smith",
      team: "Tech Team",
      status: "Pending",
      createdDate: "2024-12-01",
      members: 4,
      progress: 30,
    },
    {
      id: "5",
      name: "Database Migration",
      owner: "Sarah Johnson",
      team: "Backend Team",
      status: "Rejected",
      createdDate: "2024-11-25",
      members: 2,
      progress: 10,
    },
  ]);

  const [reports, setReports] = useState<Report[]>([
    {
      id: "1",
      type: "User",
      reportedBy: "Sarah Johnson",
      reportedItem: "John Doe (fake account)",
      reason: "Inappropriate behavior in team chat",
      date: "2024-12-01",
      status: "Pending",
    },
    {
      id: "2",
      type: "Project",
      reportedBy: "Michael Chen",
      reportedItem: "Spam Project ABC",
      reason: "Contains spam content and fake information",
      date: "2024-12-02",
      status: "Pending",
    },
    {
      id: "3",
      type: "Spam",
      reportedBy: "System Auto-Detection",
      reportedItem: "Multiple fake accounts created",
      reason: "Automated spam detection triggered",
      date: "2024-12-03",
      status: "Resolved",
    },
    {
      id: "4",
      type: "User",
      reportedBy: "Emma Davis",
      reportedItem: "Bob Wilson",
      reason: "Harassment and bullying",
      date: "2024-11-28",
      status: "Dismissed",
    },
  ]);

  const [teams, setTeams] = useState<Team[]>([
    {
      id: "1",
      name: "UI/UX Team",
      leader: "Sarah Johnson",
      members: 5,
      projects: 3,
      status: "Active",
      createdDate: "2024-01-15",
    },
    {
      id: "2",
      name: "Web Development",
      leader: "Michael Chen",
      members: 3,
      projects: 2,
      status: "Active",
      createdDate: "2024-02-20",
    },
    {
      id: "3",
      name: "Marketing",
      leader: "Emma Davis",
      members: 6,
      projects: 4,
      status: "Active",
      createdDate: "2024-03-10",
    },
    {
      id: "4",
      name: "Backend Team",
      leader: "John Smith",
      members: 4,
      projects: 2,
      status: "Active",
      createdDate: "2024-04-05",
    },
    {
      id: "5",
      name: "QA Team",
      leader: "Lisa Wang",
      members: 2,
      projects: 1,
      status: "Inactive",
      createdDate: "2024-05-12",
    },
  ]);

  const [userSearchQuery, setUserSearchQuery] = useState("");
  const [projectSearchQuery, setProjectSearchQuery] = useState("");
  const [teamSearchQuery, setTeamSearchQuery] = useState("");

  // Admin Functions
  const handleSuspendUser = (userId: string) => {
    setAdminUsers(
      adminUsers.map((user) =>
        user.id === userId
          ? {
              ...user,
              status: user.status === "Active" ? ("Suspended" as const) : ("Active" as const),
            }
          : user
      )
    );
  };

  const handleDeleteUser = (userId: string) => {
    if (confirm("Are you sure you want to delete this user?")) {
      setAdminUsers(adminUsers.filter((user) => user.id !== userId));
    }
  };

  const handleApproveProject = (projectId: string) => {
    setAdminProjects(
      adminProjects.map((proj) => (proj.id === projectId ? { ...proj, status: "Approved" as const } : proj))
    );
  };

  const handleRejectProject = (projectId: string) => {
    setAdminProjects(
      adminProjects.map((proj) => (proj.id === projectId ? { ...proj, status: "Rejected" as const } : proj))
    );
  };

  const handleArchiveProject = (projectId: string) => {
    setAdminProjects(
      adminProjects.map((proj) => (proj.id === projectId ? { ...proj, status: "Archived" as const } : proj))
    );
  };

  const handleDeleteProject = (projectId: string) => {
    if (confirm("Are you sure you want to delete this project?")) {
      setAdminProjects(adminProjects.filter((proj) => proj.id !== projectId));
    }
  };

  const handleResolveReport = (reportId: string) => {
    setReports(
      reports.map((report) => (report.id === reportId ? { ...report, status: "Resolved" as const } : report))
    );
  };

  const handleDismissReport = (reportId: string) => {
    setReports(
      reports.map((report) => (report.id === reportId ? { ...report, status: "Dismissed" as const } : report))
    );
  };

  const filteredUsers = adminUsers.filter(
    (user) =>
      user.name.toLowerCase().includes(userSearchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(userSearchQuery.toLowerCase())
  );

  const filteredProjects = adminProjects.filter((project) =>
    project.name.toLowerCase().includes(projectSearchQuery.toLowerCase())
  );

  const filteredTeams = teams.filter((team) => team.name.toLowerCase().includes(teamSearchQuery.toLowerCase()));

  React.useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDarkMode]);

  const toggleDarkMode = () => setIsDarkMode(!isDarkMode);

  // Landing Page
  const LandingPage = () => (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-indigo-50/30 dark:to-indigo-950/20">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 backdrop-blur-xl bg-white/70 dark:bg-slate-900/70 border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-600 to-purple-600 flex items-center justify-center">
                <FolderKanban className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                ProjectSphere
              </span>
            </div>

            <div className="hidden md:flex items-center gap-8">
              <a href="#features" className="text-sm font-medium text-foreground/70 hover:text-foreground transition">
                Features
              </a>
              <a href="#pricing" className="text-sm font-medium text-foreground/70 hover:text-foreground transition">
                Pricing
              </a>
              <a href="#about" className="text-sm font-medium text-foreground/70 hover:text-foreground transition">
                About
              </a>
              <button
                onClick={toggleDarkMode}
                className="p-2 rounded-lg hover:bg-accent transition"
              >
                {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </button>
              <button
                onClick={() => setCurrentPage("login")}
                className="text-sm font-medium text-foreground/70 hover:text-foreground transition"
              >
                Sign In
              </button>
              <button
                onClick={() => setCurrentPage("signup")}
                className="px-4 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg hover:shadow-lg hover:scale-105 transition-all"
              >
                Get Started
              </button>
            </div>

            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2"
            >
              {isMobileMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden border-t border-border bg-white dark:bg-slate-900"
            >
              <div className="px-4 py-4 space-y-3">
                <a href="#features" className="block py-2 text-sm font-medium">
                  Features
                </a>
                <a href="#pricing" className="block py-2 text-sm font-medium">
                  Pricing
                </a>
                <a href="#about" className="block py-2 text-sm font-medium">
                  About
                </a>
                <button
                  onClick={() => setCurrentPage("login")}
                  className="block w-full text-left py-2 text-sm font-medium"
                >
                  Sign In
                </button>
                <button
                  onClick={() => setCurrentPage("signup")}
                  className="block w-full px-4 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg text-center"
                >
                  Get Started
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-block mb-4 px-4 py-2 bg-gradient-to-r from-indigo-100 to-purple-100 dark:from-indigo-950/50 dark:to-purple-950/50 rounded-full">
                <span className="text-sm font-semibold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                  The Future of Student Collaboration
                </span>
              </div>
              <h1 className="text-5xl sm:text-6xl font-bold leading-tight mb-6">
                Collaborate Smarter with{" "}
                <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                  ProjectSphere
                </span>
              </h1>
              <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
                The ultimate platform for students to manage projects, collaborate with teams,
                track progress, and achieve academic excellence together.
              </p>
              <div className="flex flex-wrap gap-4">
                <button
                  onClick={() => setCurrentPage("signup")}
                  className="px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl font-semibold hover:shadow-xl hover:scale-105 transition-all flex items-center gap-2"
                >
                  Get Started Free
                  <ArrowRight className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setCurrentPage("dashboard")}
                  className="px-8 py-4 bg-white dark:bg-slate-800 border-2 border-border rounded-xl font-semibold hover:border-indigo-600 hover:shadow-lg transition-all"
                >
                  Explore Projects
                </button>
              </div>
              <div className="mt-12 flex items-center gap-8">
                <div>
                  <div className="text-3xl font-bold text-foreground">50K+</div>
                  <div className="text-sm text-muted-foreground">Active Students</div>
                </div>
                <div className="w-px h-12 bg-border"></div>
                <div>
                  <div className="text-3xl font-bold text-foreground">10K+</div>
                  <div className="text-sm text-muted-foreground">Projects Completed</div>
                </div>
                <div className="w-px h-12 bg-border"></div>
                <div>
                  <div className="text-3xl font-bold text-foreground">99%</div>
                  <div className="text-sm text-muted-foreground">Satisfaction</div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-3xl blur-3xl opacity-20"></div>
              <div className="relative bg-white/50 dark:bg-slate-800/50 backdrop-blur-xl border border-border rounded-3xl p-8 shadow-2xl">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-semibold">Project Dashboard</h3>
                  <div className="flex gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-950/30 dark:to-purple-950/30 p-4 rounded-xl border border-indigo-200 dark:border-indigo-800">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-semibold">Mobile App Design</span>
                      <span className="text-xs px-2 py-1 bg-indigo-600 text-white rounded-full">
                        In Progress
                      </span>
                    </div>
                    <div className="flex items-center gap-2 mb-3">
                      <Users className="w-4 h-4 text-muted-foreground" />
                      <span className="text-sm text-muted-foreground">5 members</span>
                    </div>
                    <div className="w-full h-2 bg-white dark:bg-slate-700 rounded-full overflow-hidden">
                      <div className="h-full w-3/4 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full"></div>
                    </div>
                    <div className="mt-2 text-sm text-muted-foreground">75% complete</div>
                  </div>

                  <div className="grid grid-cols-3 gap-3">
                    <div className="bg-white dark:bg-slate-800 p-3 rounded-xl border border-border">
                      <div className="text-2xl font-bold text-indigo-600">23</div>
                      <div className="text-xs text-muted-foreground">Tasks</div>
                    </div>
                    <div className="bg-white dark:bg-slate-800 p-3 rounded-xl border border-border">
                      <div className="text-2xl font-bold text-purple-600">12</div>
                      <div className="text-xs text-muted-foreground">Files</div>
                    </div>
                    <div className="bg-white dark:bg-slate-800 p-3 rounded-xl border border-border">
                      <div className="text-2xl font-bold text-cyan-600">48</div>
                      <div className="text-xs text-muted-foreground">Messages</div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-4 sm:px-6 lg:px-8 bg-white/50 dark:bg-slate-900/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Everything You Need to Succeed</h2>
            <p className="text-xl text-muted-foreground">
              Powerful features designed for modern student collaboration
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: <CheckCircle2 className="w-8 h-8" />,
                title: "Task Management",
                description: "Create, assign, and track tasks with ease. Never miss a deadline again.",
                color: "from-indigo-600 to-blue-600",
              },
              {
                icon: <Users className="w-8 h-8" />,
                title: "Team Collaboration",
                description: "Work together seamlessly with real-time updates and notifications.",
                color: "from-purple-600 to-pink-600",
              },
              {
                icon: <FileText className="w-8 h-8" />,
                title: "File Sharing",
                description: "Share documents, images, and files securely with your team.",
                color: "from-cyan-600 to-teal-600",
              },
              {
                icon: <MessageSquare className="w-8 h-8" />,
                title: "Real-time Chat",
                description: "Communicate instantly with team chat and threaded discussions.",
                color: "from-green-600 to-emerald-600",
              },
              {
                icon: <TrendingUp className="w-8 h-8" />,
                title: "Progress Tracking",
                description: "Visualize project progress with beautiful charts and insights.",
                color: "from-orange-600 to-amber-600",
              },
              {
                icon: <BarChart3 className="w-8 h-8" />,
                title: "Project Analytics",
                description: "Get detailed analytics and reports on team performance.",
                color: "from-red-600 to-rose-600",
              },
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group relative bg-white dark:bg-slate-800 rounded-2xl p-8 border border-border hover:border-transparent hover:shadow-2xl transition-all duration-300"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-transparent group-hover:from-indigo-500/10 group-hover:via-purple-500/10 group-hover:to-transparent rounded-2xl transition-all duration-300"></div>
                <div className="relative">
                  <div
                    className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${feature.color} flex items-center justify-center text-white mb-6 group-hover:scale-110 transition-transform`}
                  >
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="bg-gradient-to-br from-indigo-600 to-purple-600 rounded-3xl p-12 text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>
            <div className="relative z-10">
              <h2 className="text-4xl font-bold mb-4 text-center">Trusted by Students Worldwide</h2>
              <p className="text-xl text-indigo-100 text-center mb-12">
                Join thousands of students achieving more together
              </p>
              <div className="grid md:grid-cols-4 gap-8">
                {[
                  { number: "50,000+", label: "Active Users" },
                  { number: "10,000+", label: "Projects" },
                  { number: "500+", label: "Universities" },
                  { number: "99%", label: "Satisfaction" },
                ].map((stat, index) => (
                  <div key={index} className="text-center">
                    <div className="text-5xl font-bold mb-2">{stat.number}</div>
                    <div className="text-indigo-100">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white/50 dark:bg-slate-900/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">What Students Say</h2>
            <p className="text-xl text-muted-foreground">
              Hear from students who transformed their collaboration
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: "Sarah Johnson",
                role: "Computer Science Student",
                image: "👩‍💻",
                quote: "ProjectSphere changed how our team works. We're more organized and productive than ever!",
              },
              {
                name: "Michael Chen",
                role: "Engineering Student",
                image: "👨‍🔬",
                quote: "The best project management tool for students. Simple, powerful, and actually fun to use.",
              },
              {
                name: "Emma Davis",
                role: "Design Student",
                image: "👩‍🎨",
                quote: "Finally, a platform that understands student needs. The collaboration features are incredible!",
              },
            ].map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white dark:bg-slate-800 rounded-2xl p-8 border border-border"
              >
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-lg mb-6 text-foreground/90">"{testimonial.quote}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-indigo-600 to-purple-600 flex items-center justify-center text-2xl">
                    {testimonial.image}
                  </div>
                  <div>
                    <div className="font-semibold">{testimonial.name}</div>
                    <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white dark:bg-slate-900 border-t border-border py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-600 to-purple-600 flex items-center justify-center">
                  <FolderKanban className="w-6 h-6 text-white" />
                </div>
                <span className="text-xl font-bold">ProjectSphere</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Empowering students to collaborate smarter and achieve more together.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <a href="#" className="hover:text-foreground transition">
                    Features
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-foreground transition">
                    Pricing
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-foreground transition">
                    Security
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <a href="#" className="hover:text-foreground transition">
                    About Us
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-foreground transition">
                    Careers
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-foreground transition">
                    Contact
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Connect</h4>
              <div className="flex gap-3">
                <a
                  href="#"
                  className="w-10 h-10 rounded-lg bg-accent hover:bg-primary hover:text-white transition flex items-center justify-center"
                >
                  <Github className="w-5 h-5" />
                </a>
                <a
                  href="#"
                  className="w-10 h-10 rounded-lg bg-accent hover:bg-primary hover:text-white transition flex items-center justify-center"
                >
                  <Chrome className="w-5 h-5" />
                </a>
                <a
                  href="#"
                  className="w-10 h-10 rounded-lg bg-accent hover:bg-primary hover:text-white transition flex items-center justify-center"
                >
                  <Mail className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>
          <div className="pt-8 border-t border-border text-center text-sm text-muted-foreground">
            © 2024 ProjectSphere. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );

  // Login Page
  const LoginPage = () => (
    <div className="min-h-screen grid lg:grid-cols-2">
      {/* Left Side - Form */}
      <div className="flex items-center justify-center p-8 bg-background">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="w-full max-w-md"
        >
          <div className="mb-8">
            <button
              onClick={() => setCurrentPage("landing")}
              className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-8"
            >
              <ArrowRight className="w-4 h-4 rotate-180" />
              Back to home
            </button>
            <div className="flex items-center gap-2 mb-6">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-600 to-purple-600 flex items-center justify-center">
                <FolderKanban className="w-7 h-7 text-white" />
              </div>
              <span className="text-2xl font-bold">ProjectSphere</span>
            </div>
            <h1 className="text-3xl font-bold mb-2">Welcome back</h1>
            <p className="text-muted-foreground">Sign in to continue to your projects</p>
          </div>

          <div className="space-y-4">
            {/* Social Login */}
            <div className="grid grid-cols-2 gap-3">
              <button className="flex items-center justify-center gap-2 px-4 py-3 border border-border rounded-xl hover:bg-accent transition">
                <Github className="w-5 h-5" />
                <span className="text-sm font-medium">GitHub</span>
              </button>
              <button className="flex items-center justify-center gap-2 px-4 py-3 border border-border rounded-xl hover:bg-accent transition">
                <Chrome className="w-5 h-5" />
                <span className="text-sm font-medium">Google</span>
              </button>
            </div>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-border"></div>
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground">Or continue with</span>
              </div>
            </div>

            {/* Role Selection */}
            <div className="mb-6">
              <label className="block text-sm font-medium mb-3">I am a</label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setSelectedRole("customer")}
                  className={`p-4 border-2 rounded-xl transition-all ${
                    selectedRole === "customer"
                      ? "border-indigo-600 bg-indigo-50 dark:bg-indigo-950/30"
                      : "border-border hover:border-indigo-300 dark:hover:border-indigo-700"
                  }`}
                >
                  <div className="flex flex-col items-center gap-2">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                      selectedRole === "customer"
                        ? "bg-gradient-to-br from-indigo-600 to-purple-600 text-white"
                        : "bg-accent text-muted-foreground"
                    }`}>
                      <UserCircle2 className="w-6 h-6" />
                    </div>
                    <div className="text-center">
                      <div className={`text-sm font-semibold ${
                        selectedRole === "customer" ? "text-indigo-600 dark:text-indigo-400" : ""
                      }`}>
                        Customer
                      </div>
                      <div className="text-xs text-muted-foreground">I need work done</div>
                    </div>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => setSelectedRole("maker")}
                  className={`p-4 border-2 rounded-xl transition-all ${
                    selectedRole === "maker"
                      ? "border-green-600 bg-green-50 dark:bg-green-950/30"
                      : "border-border hover:border-green-300 dark:hover:border-green-700"
                  }`}
                >
                  <div className="flex flex-col items-center gap-2">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                      selectedRole === "maker"
                        ? "bg-gradient-to-br from-green-600 to-emerald-600 text-white"
                        : "bg-accent text-muted-foreground"
                    }`}>
                      <Briefcase className="w-6 h-6" />
                    </div>
                    <div className="text-center">
                      <div className={`text-sm font-semibold ${
                        selectedRole === "maker" ? "text-green-600 dark:text-green-400" : ""
                      }`}>
                        Maker
                      </div>
                      <div className="text-xs text-muted-foreground">I do the work</div>
                    </div>
                  </div>
                </button>
              </div>
            </div>

            {/* Email/Password Form */}
            <form
              className="space-y-4"
              onSubmit={(e) => {
                e.preventDefault();
                const email = (e.currentTarget.elements.namedItem("email") as HTMLInputElement).value;

                // Check if admin login
                if (email === "admin@projectsphere.com") {
                  setIsAdmin(true);
                  setIsMaker(false);
                  setCurrentUserId("admin-1");
                  setCurrentUserName("Admin User");
                  setCurrentPage("admin");
                } else if (selectedRole === "maker") {
                  setIsAdmin(false);
                  setIsMaker(true);
                  setCurrentUserId("maker-1");
                  setCurrentUserName("Alex Thompson");
                  setCurrentPage("maker-dashboard");
                } else {
                  setIsAdmin(false);
                  setIsMaker(false);
                  setCurrentUserId("user-1");
                  setCurrentUserName("Sarah Johnson");
                  setCurrentPage("dashboard");
                }
              }}
            >
              <div>
                <label className="block text-sm font-medium mb-2">Email</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <input
                    type="email"
                    name="email"
                    placeholder="your.email@university.edu"
                    className="w-full pl-10 pr-4 py-3 bg-input-background border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-ring"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Password</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    placeholder="Enter your password"
                    className="w-full pl-10 pr-12 py-3 bg-input-background border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-ring"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <label className="flex items-center gap-2">
                  <input type="checkbox" className="rounded" />
                  <span className="text-sm text-muted-foreground">Remember me</span>
                </label>
                <a href="#" className="text-sm text-primary hover:underline">
                  Forgot password?
                </a>
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl font-semibold hover:shadow-lg hover:scale-[1.02] transition-all"
              >
                Sign In
              </button>

              <div className="text-center text-sm text-muted-foreground">
                <p>Demo Admin Login:</p>
                <p className="font-mono text-xs mt-1">admin@projectsphere.com</p>
              </div>
            </form>

            <p className="text-center text-sm text-muted-foreground">
              Don't have an account?{" "}
              <button
                onClick={() => setCurrentPage("signup")}
                className="text-primary font-semibold hover:underline"
              >
                Sign up
              </button>
            </p>
          </div>
        </motion.div>
      </div>

      {/* Right Side - Illustration */}
      <div className="hidden lg:flex items-center justify-center bg-gradient-to-br from-indigo-600 to-purple-600 p-12 relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-white/10"></div>
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="relative z-10 text-white max-w-md"
        >
          <div className="mb-8">
            <div className="inline-block p-4 bg-white/10 backdrop-blur-xl rounded-2xl mb-6">
              <FolderKanban className="w-16 h-16" />
            </div>
            <h2 className="text-4xl font-bold mb-4">Start collaborating today</h2>
            <p className="text-indigo-100 text-lg">
              Join thousands of students managing their projects smarter with ProjectSphere.
            </p>
          </div>

          <div className="space-y-4">
            {[
              { icon: <CheckCircle2 />, text: "Unlimited projects and teams" },
              { icon: <CheckCircle2 />, text: "Real-time collaboration" },
              { icon: <CheckCircle2 />, text: "Secure file sharing" },
            ].map((item, index) => (
              <div key={index} className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-white/20 flex items-center justify-center">
                  {item.icon}
                </div>
                <span className="text-indigo-50">{item.text}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );

  // Signup Page
  const SignupPage = () => (
    <div className="min-h-screen grid lg:grid-cols-2">
      {/* Left Side - Illustration */}
      <div className="hidden lg:flex items-center justify-center bg-gradient-to-br from-purple-600 to-indigo-600 p-12 relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-white/10"></div>
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="relative z-10 text-white max-w-md"
        >
          <div className="mb-8">
            <div className="inline-block p-4 bg-white/10 backdrop-blur-xl rounded-2xl mb-6">
              <Users className="w-16 h-16" />
            </div>
            <h2 className="text-4xl font-bold mb-4">Join the community</h2>
            <p className="text-purple-100 text-lg">
              Create your free account and start collaborating with your team in minutes.
            </p>
          </div>

          <div className="space-y-4">
            {[
              { icon: <Zap />, text: "Set up in under 2 minutes" },
              { icon: <Users />, text: "Invite unlimited team members" },
              { icon: <Trophy />, text: "Access all premium features" },
            ].map((item, index) => (
              <div key={index} className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-white/20 flex items-center justify-center">
                  {item.icon}
                </div>
                <span className="text-purple-50">{item.text}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Right Side - Form */}
      <div className="flex items-center justify-center p-8 bg-background">
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="w-full max-w-md"
        >
          <div className="mb-8">
            <button
              onClick={() => setCurrentPage("landing")}
              className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-8"
            >
              <ArrowRight className="w-4 h-4 rotate-180" />
              Back to home
            </button>
            <div className="flex items-center gap-2 mb-6">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-600 to-purple-600 flex items-center justify-center">
                <FolderKanban className="w-7 h-7 text-white" />
              </div>
              <span className="text-2xl font-bold">ProjectSphere</span>
            </div>
            <h1 className="text-3xl font-bold mb-2">Create your account</h1>
            <p className="text-muted-foreground">Start your journey to better collaboration</p>
          </div>

          <div className="space-y-4">
            {/* Social Signup */}
            <div className="grid grid-cols-2 gap-3">
              <button className="flex items-center justify-center gap-2 px-4 py-3 border border-border rounded-xl hover:bg-accent transition">
                <Github className="w-5 h-5" />
                <span className="text-sm font-medium">GitHub</span>
              </button>
              <button className="flex items-center justify-center gap-2 px-4 py-3 border border-border rounded-xl hover:bg-accent transition">
                <Chrome className="w-5 h-5" />
                <span className="text-sm font-medium">Google</span>
              </button>
            </div>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-border"></div>
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground">Or sign up with</span>
              </div>
            </div>

            {/* Signup Form */}
            <form className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium mb-2">First Name</label>
                  <input
                    type="text"
                    placeholder="John"
                    className="w-full px-4 py-3 bg-input-background border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-ring"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Last Name</label>
                  <input
                    type="text"
                    placeholder="Doe"
                    className="w-full px-4 py-3 bg-input-background border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-ring"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Email</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <input
                    type="email"
                    placeholder="your.email@university.edu"
                    className="w-full pl-10 pr-4 py-3 bg-input-background border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-ring"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Password</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Create a strong password"
                    className="w-full pl-10 pr-12 py-3 bg-input-background border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-ring"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              <label className="flex items-start gap-2">
                <input type="checkbox" className="mt-1 rounded" />
                <span className="text-sm text-muted-foreground">
                  I agree to the{" "}
                  <a href="#" className="text-primary hover:underline">
                    Terms of Service
                  </a>{" "}
                  and{" "}
                  <a href="#" className="text-primary hover:underline">
                    Privacy Policy
                  </a>
                </span>
              </label>

              <button
                type="button"
                onClick={() => setCurrentPage("dashboard")}
                className="w-full py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl font-semibold hover:shadow-lg hover:scale-[1.02] transition-all"
              >
                Create Account
              </button>
            </form>

            <p className="text-center text-sm text-muted-foreground">
              Already have an account?{" "}
              <button
                onClick={() => setCurrentPage("login")}
                className="text-primary font-semibold hover:underline"
              >
                Sign in
              </button>
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );

  // Dashboard Page
  const DashboardPage = () => {
    const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

    const myProjects = projects.filter((p) => p.ownerId === currentUserId);
    const activeProjectsCount = myProjects.filter((p) => p.status === "Active" || p.status === "In Progress").length;
    const completedProjectsCount = myProjects.filter((p) => p.status === "Completed").length;
    const totalBudget = myProjects.reduce((sum, p) => {
      const budget = parseInt(p.budget.replace(/[$,]/g, ""));
      return sum + (isNaN(budget) ? 0 : budget);
    }, 0);
    const unreadMessages = conversations.reduce((sum, c) => sum + c.unread, 0);

    return (
      <div className="min-h-screen bg-background flex">
        {/* Sidebar */}
        <aside
          className={`${
            sidebarCollapsed ? "w-20" : "w-64"
          } bg-sidebar border-r border-sidebar-border transition-all duration-300 flex flex-col`}
        >
          <div className="p-4 border-b border-sidebar-border">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-600 to-purple-600 flex items-center justify-center flex-shrink-0">
                <FolderKanban className="w-6 h-6 text-white" />
              </div>
              {!sidebarCollapsed && (
                <span className="text-lg font-bold">ProjectSphere</span>
              )}
            </div>
          </div>

          <nav className="flex-1 p-4 space-y-2 overflow-auto">
            {[
              { icon: <LayoutDashboard />, label: "Dashboard", page: "dashboard" },
              { icon: <Plus />, label: "Post Project", page: "post-project" },
              { icon: <FolderKanban />, label: "My Projects", page: "my-projects" },
              { icon: <Users />, label: "Browse Makers", page: "browse-makers" },
              { icon: <MessageSquare />, label: "Messages", page: "messages" },
              { icon: <DollarSign />, label: "Payments", page: "payments" },
              { icon: <Star />, label: "Reviews", page: "reviews" },
              { icon: <UserCircle2 />, label: "Profile", page: "profile" },
              { icon: <Settings />, label: "Settings", page: "settings" },
            ].map((item, index) => (
              <motion.button
                key={index}
                onClick={() => setCurrentPage(item.page as any)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 ${
                  currentPage === item.page
                    ? "bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg scale-105"
                    : "text-sidebar-foreground hover:bg-sidebar-accent hover:scale-102"
                }`}
                whileHover={{ x: 4 }}
                whileTap={{ scale: 0.98 }}
              >
                <span className="flex-shrink-0">{item.icon}</span>
                {!sidebarCollapsed && <span className="text-sm font-medium">{item.label}</span>}
              </motion.button>
            ))}
          </nav>

          <div className="p-4 border-t border-sidebar-border space-y-2">
            <button
              onClick={() => {
                setCurrentPage("login");
                setIsAdmin(false);
              }}
              className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-red-600 hover:bg-red-50 dark:hover:bg-red-950/20 transition-all hover:scale-102"
            >
              <LogOut className="flex-shrink-0" />
              {!sidebarCollapsed && <span className="text-sm font-medium">Logout</span>}
            </button>
          </div>
        </aside>

        {/* Main Content */}
        <div className="flex-1 flex flex-col">
          {/* Top Navbar */}
          <header className="h-16 border-b border-border bg-card flex items-center justify-between px-6">
            <div className="flex items-center gap-4">
              <button onClick={() => setSidebarCollapsed(!sidebarCollapsed)}>
                <Menu className="w-5 h-5" />
              </button>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search projects, tasks..."
                  className="pl-9 pr-4 py-2 w-80 bg-accent rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                />
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={toggleDarkMode}
                className="p-2 rounded-lg hover:bg-accent transition"
              >
                {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </button>
              <button
                onClick={() => setShowNotifications(!showNotifications)}
                className="relative p-2 rounded-lg hover:bg-accent transition"
              >
                <Bell className="w-5 h-5" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>
              {showNotifications && (
                <div className="absolute top-16 right-6 w-80 bg-card border border-border rounded-2xl shadow-2xl z-50 p-4">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-bold">Notifications</h3>
                    <button onClick={() => setShowNotifications(false)} className="text-muted-foreground hover:text-foreground">
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="space-y-3 max-h-96 overflow-auto">
                    {[
                      { title: "New project application", message: "Alex Thompson applied to your project", time: "5 min ago", unread: true },
                      { title: "Payment received", message: "You received $2,500 from Mobile App project", time: "2 hours ago", unread: true },
                      { title: "Project milestone completed", message: "Website Redesign milestone 2 completed", time: "1 day ago", unread: false },
                    ].map((notif, i) => (
                      <div key={i} className={`p-3 rounded-lg hover:bg-accent transition cursor-pointer ${notif.unread ? "bg-accent" : ""}`}>
                        <div className="flex items-start gap-3">
                          <div className={`w-2 h-2 rounded-full mt-2 ${notif.unread ? "bg-primary" : "bg-transparent"}`}></div>
                          <div className="flex-1">
                            <div className="font-semibold text-sm">{notif.title}</div>
                            <div className="text-xs text-muted-foreground">{notif.message}</div>
                            <div className="text-xs text-muted-foreground mt-1">{notif.time}</div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              <button
                onClick={() => setShowProfileDropdown(!showProfileDropdown)}
                className="relative flex items-center gap-3 pl-3 border-l border-border"
              >
                <div className="text-right">
                  <div className="text-sm font-semibold">Sarah Johnson</div>
                  <div className="text-xs text-muted-foreground">Customer</div>
                </div>
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-600 to-purple-600 flex items-center justify-center text-white font-semibold">
                  SJ
                </div>
              </button>
              {showProfileDropdown && (
                <div className="absolute top-16 right-6 w-64 bg-card border border-border rounded-2xl shadow-2xl z-50 p-2">
                  <button
                    onClick={() => {
                      setShowProfileDropdown(false);
                      setCurrentPage("profile");
                    }}
                    className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-accent transition text-left"
                  >
                    <UserCircle2 className="w-4 h-4" />
                    <span className="text-sm">View Profile</span>
                  </button>
                  <button
                    onClick={() => {
                      setShowProfileDropdown(false);
                      setCurrentPage("customer-settings");
                    }}
                    className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-accent transition text-left"
                  >
                    <Settings className="w-4 h-4" />
                    <span className="text-sm">Settings</span>
                  </button>
                  <div className="my-2 border-t border-border"></div>
                  <button
                    onClick={() => {
                      setShowProfileDropdown(false);
                      setCurrentPage("login");
                      setIsAdmin(false);
                      setIsMaker(false);
                    }}
                    className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-red-50 dark:hover:bg-red-950/20 text-red-600 transition text-left"
                  >
                    <LogOut className="w-4 h-4" />
                    <span className="text-sm">Logout</span>
                  </button>
                </div>
              )}
            </div>
          </header>

          {/* Dashboard Content */}
          <main className="flex-1 overflow-auto p-6">
            <div className="max-w-7xl mx-auto space-y-6">
              {/* Welcome Section */}
              <div>
                <h1 className="text-3xl font-bold mb-2">Welcome back, Sarah! 👋</h1>
                <p className="text-muted-foreground">
                  Here's what's happening with your projects today.
                </p>
              </div>

              {/* Stats Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                  {
                    label: "Active Projects",
                    value: activeProjectsCount.toString(),
                    change: `${myProjects.length} total`,
                    icon: <FolderKanban />,
                    color: "from-indigo-600 to-blue-600",
                    trend: "up",
                    onClick: () => setCurrentPage("my-projects"),
                  },
                  {
                    label: "Completed Projects",
                    value: completedProjectsCount.toString(),
                    change: `${Math.round((completedProjectsCount / Math.max(myProjects.length, 1)) * 100)}% success rate`,
                    icon: <CheckCircle2 />,
                    color: "from-green-600 to-emerald-600",
                    trend: "up",
                    onClick: () => setCurrentPage("my-projects"),
                  },
                  {
                    label: "Total Budget",
                    value: `$${totalBudget.toLocaleString()}`,
                    change: `${myProjects.length} projects`,
                    icon: <DollarSign />,
                    color: "from-purple-600 to-pink-600",
                    trend: "up",
                    onClick: () => setCurrentPage("customer-payments"),
                  },
                  {
                    label: "Messages",
                    value: unreadMessages.toString(),
                    change: `${conversations.length} conversations`,
                    icon: <MessageSquare />,
                    color: "from-cyan-600 to-teal-600",
                    trend: "up",
                    onClick: () => setCurrentPage("customer-messages"),
                  },
                ].map((stat, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    onClick={stat.onClick}
                    className={`bg-card border border-border rounded-2xl p-6 hover:shadow-lg transition-shadow ${stat.onClick ? "cursor-pointer" : ""}`}
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div
                        className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center text-white`}
                      >
                        {stat.icon}
                      </div>
                      <div className="flex items-center gap-1 text-xs text-green-600 dark:text-green-400">
                        <TrendingUp className="w-3 h-3" />
                        <span>{stat.change}</span>
                      </div>
                    </div>
                    <div className="text-3xl font-bold mb-1">{stat.value}</div>
                    <div className="text-sm text-muted-foreground">{stat.label}</div>
                  </motion.div>
                ))}
              </div>

              {/* Projects & Tasks Section */}
              <div className="grid lg:grid-cols-3 gap-6">
                {/* Active Projects */}
                <div className="lg:col-span-2 bg-card border border-border rounded-2xl p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-bold">Active Projects</h2>
                    <button
                      onClick={() => setCurrentPage("active-projects")}
                      className="text-sm text-primary hover:underline flex items-center gap-1"
                    >
                      View all
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="space-y-4">
                    {[
                      {
                        name: "Mobile App Design",
                        team: "UI/UX Team",
                        progress: 75,
                        members: ["👩‍💻", "👨‍🔬", "👩‍🎨"],
                        color: "from-indigo-600 to-purple-600",
                        status: "On Track",
                      },
                      {
                        name: "Website Redesign",
                        team: "Web Development",
                        progress: 45,
                        members: ["👨‍💻", "👩‍💼"],
                        color: "from-purple-600 to-pink-600",
                        status: "In Progress",
                      },
                      {
                        name: "Marketing Campaign",
                        team: "Marketing",
                        progress: 90,
                        members: ["👩‍🎓", "👨‍🎓", "👩‍💼", "👨‍💼"],
                        color: "from-cyan-600 to-teal-600",
                        status: "Almost Done",
                      },
                    ].map((project, index) => (
                      <div
                        key={index}
                        onClick={() => setCurrentPage("project")}
                        className="p-4 border border-border rounded-xl hover:border-primary hover:shadow-md transition-all cursor-pointer"
                      >
                        <div className="flex items-start justify-between mb-3">
                          <div>
                            <h3 className="font-semibold mb-1">{project.name}</h3>
                            <p className="text-sm text-muted-foreground">{project.team}</p>
                          </div>
                          <span className="text-xs px-3 py-1 bg-gradient-to-r from-green-100 to-emerald-100 dark:from-green-950/50 dark:to-emerald-950/50 text-green-700 dark:text-green-400 rounded-full font-medium">
                            {project.status}
                          </span>
                        </div>

                        <div className="flex items-center gap-2 mb-3">
                          {project.members.map((member, i) => (
                            <div
                              key={i}
                              className="w-8 h-8 rounded-full bg-gradient-to-br from-slate-200 to-slate-300 dark:from-slate-700 dark:to-slate-800 flex items-center justify-center text-sm"
                            >
                              {member}
                            </div>
                          ))}
                          <span className="text-xs text-muted-foreground ml-2">
                            +{project.members.length} members
                          </span>
                        </div>

                        <div className="space-y-2">
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-muted-foreground">Progress</span>
                            <span className="font-semibold">{project.progress}%</span>
                          </div>
                          <div className="w-full h-2 bg-accent rounded-full overflow-hidden">
                            <div
                              className={`h-full bg-gradient-to-r ${project.color} rounded-full transition-all`}
                              style={{ width: `${project.progress}%` }}
                            ></div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Upcoming Deadlines & Calendar */}
                <div className="space-y-6">
                  {/* Calendar Widget */}
                  <div className="bg-card border border-border rounded-2xl p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-bold">Calendar</h3>
                      <Calendar className="w-5 h-5 text-muted-foreground" />
                    </div>
                    <div className="bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-950/30 dark:to-purple-950/30 rounded-xl p-4">
                      <div className="text-center mb-2">
                        <div className="text-sm text-muted-foreground">Today</div>
                        <div className="text-3xl font-bold">24</div>
                        <div className="text-sm text-muted-foreground">December 2024</div>
                      </div>
                    </div>
                  </div>

                  {/* Upcoming Deadlines */}
                  <div className="bg-card border border-border rounded-2xl p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-bold">Upcoming Deadlines</h3>
                      <Clock className="w-5 h-5 text-muted-foreground" />
                    </div>
                    <div className="space-y-3">
                      {[
                        {
                          task: "Submit Design Mockups",
                          project: "Mobile App",
                          date: "Dec 26",
                          urgent: true,
                        },
                        {
                          task: "Code Review",
                          project: "Website Redesign",
                          date: "Dec 27",
                          urgent: false,
                        },
                        {
                          task: "Final Presentation",
                          project: "Marketing Campaign",
                          date: "Dec 28",
                          urgent: false,
                        },
                      ].map((deadline, index) => (
                        <div
                          key={index}
                          className="flex items-start gap-3 p-3 bg-accent rounded-lg hover:bg-accent/70 transition cursor-pointer"
                        >
                          <div
                            className={`mt-1 w-2 h-2 rounded-full flex-shrink-0 ${
                              deadline.urgent ? "bg-red-500" : "bg-green-500"
                            }`}
                          ></div>
                          <div className="flex-1 min-w-0">
                            <div className="text-sm font-semibold truncate">{deadline.task}</div>
                            <div className="text-xs text-muted-foreground">{deadline.project}</div>
                          </div>
                          <div className="text-xs text-muted-foreground whitespace-nowrap">
                            {deadline.date}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Team Activity Feed */}
              <div className="bg-card border border-border rounded-2xl p-6">
                <h2 className="text-xl font-bold mb-6">Recent Activity</h2>
                <div className="space-y-4">
                  {[
                    {
                      user: "Michael Chen",
                      action: "completed task",
                      target: "Design System Documentation",
                      time: "2 hours ago",
                      avatar: "👨‍🔬",
                    },
                    {
                      user: "Emma Davis",
                      action: "uploaded file",
                      target: "wireframes-v2.fig",
                      time: "4 hours ago",
                      avatar: "👩‍🎨",
                    },
                    {
                      user: "John Smith",
                      action: "commented on",
                      target: "Mobile App Design",
                      time: "6 hours ago",
                      avatar: "👨‍💻",
                    },
                    {
                      user: "Sarah Johnson",
                      action: "created project",
                      target: "Q1 Planning Sprint",
                      time: "1 day ago",
                      avatar: "👩‍💻",
                    },
                  ].map((activity, index) => (
                    <div key={index} className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-600 to-purple-600 flex items-center justify-center text-white flex-shrink-0">
                        {activity.avatar}
                      </div>
                      <div className="flex-1">
                        <p className="text-sm">
                          <span className="font-semibold">{activity.user}</span>{" "}
                          <span className="text-muted-foreground">{activity.action}</span>{" "}
                          <span className="font-semibold">{activity.target}</span>
                        </p>
                        <p className="text-xs text-muted-foreground">{activity.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    );
  };

  // Project Details Page (Kanban Board)
  const ProjectPage = () => {
    return (
      <div className="min-h-screen bg-background flex">
        {/* Sidebar */}
        <aside className="w-64 bg-sidebar border-r border-sidebar-border flex flex-col">
          <div className="p-4 border-b border-sidebar-border">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-600 to-purple-600 flex items-center justify-center">
                <FolderKanban className="w-6 h-6 text-white" />
              </div>
              <span className="text-lg font-bold">ProjectSphere</span>
            </div>
          </div>

          <nav className="flex-1 p-4 space-y-2">
            {[
              { icon: <LayoutDashboard />, label: "Dashboard", onClick: () => setCurrentPage("dashboard") },
              { icon: <FolderKanban />, label: "Projects", active: true },
              { icon: <Users />, label: "Team", onClick: () => setCurrentPage("team") },
              { icon: <Calendar />, label: "Calendar" },
              { icon: <FileText />, label: "Files" },
              { icon: <BarChart3 />, label: "Analytics" },
            ].map((item, index) => (
              <button
                key={index}
                onClick={item.onClick}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition ${
                  item.active
                    ? "bg-sidebar-primary text-sidebar-primary-foreground"
                    : "text-sidebar-foreground hover:bg-sidebar-accent"
                }`}
              >
                {item.icon}
                <span className="text-sm font-medium">{item.label}</span>
              </button>
            ))}
          </nav>

          <div className="p-4 border-t border-sidebar-border">
            <button
              onClick={() => setCurrentPage("landing")}
              className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sidebar-foreground hover:bg-sidebar-accent transition"
            >
              <LogOut />
              <span className="text-sm font-medium">Logout</span>
            </button>
          </div>
        </aside>

        {/* Main Content */}
        <div className="flex-1 flex flex-col">
          {/* Top Navbar */}
          <header className="h-16 border-b border-border bg-card flex items-center justify-between px-6">
            <div className="flex items-center gap-4">
              <button onClick={() => setCurrentPage("dashboard")}>
                <ArrowRight className="w-5 h-5 rotate-180" />
              </button>
              <div>
                <h1 className="text-lg font-bold">Mobile App Design</h1>
                <p className="text-xs text-muted-foreground">UI/UX Team • 5 members</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={toggleDarkMode}
                className="p-2 rounded-lg hover:bg-accent transition"
              >
                {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </button>
              <button className="px-4 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg hover:shadow-lg transition flex items-center gap-2">
                <Plus className="w-4 h-4" />
                Add Task
              </button>
            </div>
          </header>

          {/* Kanban Board */}
          <main className="flex-1 overflow-auto p-6">
            <div className="flex gap-6 h-full">
              {[
                { title: "To Do", color: "bg-slate-500", count: 5 },
                { title: "In Progress", color: "bg-indigo-500", count: 3 },
                { title: "Review", color: "bg-purple-500", count: 2 },
                { title: "Done", color: "bg-green-500", count: 8 },
              ].map((column, columnIndex) => (
                <div key={columnIndex} className="flex-1 min-w-[300px]">
                  <div className="bg-card border border-border rounded-2xl p-4 h-full flex flex-col">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-2">
                        <div className={`w-3 h-3 rounded-full ${column.color}`}></div>
                        <h3 className="font-bold">{column.title}</h3>
                        <span className="text-xs px-2 py-1 bg-accent rounded-full">
                          {column.count}
                        </span>
                      </div>
                      <button className="p-1 hover:bg-accent rounded">
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="space-y-3 overflow-auto">
                      {columnIndex === 0 && (
                        <>
                          <TaskCard
                            title="Design login screen"
                            priority="High"
                            assignees={["👩‍💻", "👨‍🔬"]}
                            comments={5}
                            attachments={3}
                          />
                          <TaskCard
                            title="Create user personas"
                            priority="Medium"
                            assignees={["👩‍🎨"]}
                            comments={2}
                            attachments={1}
                          />
                          <TaskCard
                            title="Research competitors"
                            priority="Low"
                            assignees={["👨‍💻"]}
                            comments={0}
                            attachments={0}
                          />
                        </>
                      )}
                      {columnIndex === 1 && (
                        <>
                          <TaskCard
                            title="Build component library"
                            priority="High"
                            assignees={["👩‍💻", "👨‍💻"]}
                            comments={12}
                            attachments={5}
                          />
                          <TaskCard
                            title="Design navigation flow"
                            priority="Medium"
                            assignees={["👩‍🎨"]}
                            comments={8}
                            attachments={2}
                          />
                        </>
                      )}
                      {columnIndex === 2 && (
                        <>
                          <TaskCard
                            title="Review color palette"
                            priority="Medium"
                            assignees={["👩‍🎨", "👨‍🔬"]}
                            comments={4}
                            attachments={1}
                          />
                        </>
                      )}
                      {columnIndex === 3 && (
                        <>
                          <TaskCard
                            title="Initial wireframes"
                            priority="High"
                            assignees={["👩‍💻"]}
                            comments={15}
                            attachments={8}
                            completed
                          />
                          <TaskCard
                            title="Brand guidelines"
                            priority="Medium"
                            assignees={["👩‍🎨"]}
                            comments={6}
                            attachments={3}
                            completed
                          />
                        </>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </main>

          {/* Side Panel */}
          <aside className="w-80 border-l border-border bg-card p-6 overflow-auto">
            <div className="space-y-6">
              {/* Team Members */}
              <div>
                <h3 className="font-bold mb-4 flex items-center gap-2">
                  <Users className="w-5 h-5" />
                  Team Members
                </h3>
                <div className="space-y-3">
                  {[
                    { name: "Sarah Johnson", role: "Designer", status: "online", avatar: "👩‍💻" },
                    { name: "Michael Chen", role: "Developer", status: "online", avatar: "👨‍🔬" },
                    { name: "Emma Davis", role: "Designer", status: "offline", avatar: "👩‍🎨" },
                    { name: "John Smith", role: "Developer", status: "offline", avatar: "👨‍💻" },
                  ].map((member, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <div className="relative">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-600 to-purple-600 flex items-center justify-center text-white">
                          {member.avatar}
                        </div>
                        <div
                          className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-card ${
                            member.status === "online" ? "bg-green-500" : "bg-slate-400"
                          }`}
                        ></div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-semibold truncate">{member.name}</div>
                        <div className="text-xs text-muted-foreground">{member.role}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Files */}
              <div>
                <h3 className="font-bold mb-4 flex items-center gap-2">
                  <FileText className="w-5 h-5" />
                  Recent Files
                </h3>
                <div className="space-y-2">
                  {[
                    { name: "wireframes-v2.fig", size: "2.4 MB", time: "2h ago" },
                    { name: "design-system.sketch", size: "5.1 MB", time: "1d ago" },
                    { name: "user-research.pdf", size: "1.2 MB", time: "2d ago" },
                  ].map((file, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-3 p-3 bg-accent rounded-lg hover:bg-accent/70 transition cursor-pointer"
                    >
                      <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-indigo-100 to-purple-100 dark:from-indigo-950 dark:to-purple-950 flex items-center justify-center">
                        <FileText className="w-5 h-5 text-indigo-600" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-medium truncate">{file.name}</div>
                        <div className="text-xs text-muted-foreground">
                          {file.size} • {file.time}
                        </div>
                      </div>
                      <button className="p-1 hover:bg-background rounded">
                        <Download className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
                <button className="w-full mt-3 py-2 border-2 border-dashed border-border rounded-lg text-sm font-medium text-muted-foreground hover:border-primary hover:text-primary transition flex items-center justify-center gap-2">
                  <Upload className="w-4 h-4" />
                  Upload File
                </button>
              </div>

              {/* Activity */}
              <div>
                <h3 className="font-bold mb-4 flex items-center gap-2">
                  <Activity className="w-5 h-5" />
                  Activity
                </h3>
                <div className="space-y-3">
                  {[
                    { user: "Sarah", action: "moved task to Review", time: "1h ago" },
                    { user: "Michael", action: "added 3 files", time: "2h ago" },
                    { user: "Emma", action: "completed Design login", time: "5h ago" },
                  ].map((activity, index) => (
                    <div key={index} className="text-sm">
                      <span className="font-semibold">{activity.user}</span>{" "}
                      <span className="text-muted-foreground">{activity.action}</span>
                      <div className="text-xs text-muted-foreground mt-1">{activity.time}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    );
  };

  // Team Collaboration Page
  const TeamPage = () => {
    return (
      <div className="min-h-screen bg-background flex">
        {/* Sidebar */}
        <aside className="w-64 bg-sidebar border-r border-sidebar-border flex flex-col">
          <div className="p-4 border-b border-sidebar-border">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-600 to-purple-600 flex items-center justify-center">
                <FolderKanban className="w-6 h-6 text-white" />
              </div>
              <span className="text-lg font-bold">ProjectSphere</span>
            </div>
          </div>

          <nav className="flex-1 p-4 space-y-2">
            {[
              { icon: <LayoutDashboard />, label: "Dashboard", onClick: () => setCurrentPage("dashboard") },
              { icon: <FolderKanban />, label: "Projects", onClick: () => setCurrentPage("project") },
              { icon: <Users />, label: "Team", active: true },
              { icon: <Calendar />, label: "Calendar" },
              { icon: <FileText />, label: "Files" },
              { icon: <BarChart3 />, label: "Analytics" },
            ].map((item, index) => (
              <button
                key={index}
                onClick={item.onClick}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition ${
                  item.active
                    ? "bg-sidebar-primary text-sidebar-primary-foreground"
                    : "text-sidebar-foreground hover:bg-sidebar-accent"
                }`}
              >
                {item.icon}
                <span className="text-sm font-medium">{item.label}</span>
              </button>
            ))}
          </nav>

          <div className="p-4 border-t border-sidebar-border">
            <button
              onClick={() => setCurrentPage("landing")}
              className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sidebar-foreground hover:bg-sidebar-accent transition"
            >
              <LogOut />
              <span className="text-sm font-medium">Logout</span>
            </button>
          </div>
        </aside>

        {/* Main Content */}
        <div className="flex-1 flex">
          {/* Chat Area */}
          <div className="flex-1 flex flex-col">
            {/* Top Bar */}
            <header className="h-16 border-b border-border bg-card flex items-center justify-between px-6">
              <div className="flex items-center gap-4">
                <button onClick={() => setCurrentPage("dashboard")}>
                  <ArrowRight className="w-5 h-5 rotate-180" />
                </button>
                <div>
                  <h1 className="text-lg font-bold">UI/UX Team</h1>
                  <p className="text-xs text-green-600 dark:text-green-400 flex items-center gap-1">
                    <Circle className="w-2 h-2 fill-current" />
                    4 members online
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={toggleDarkMode}
                  className="p-2 rounded-lg hover:bg-accent transition"
                >
                  {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                </button>
                <button className="px-4 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg hover:shadow-lg transition flex items-center gap-2">
                  <Video className="w-4 h-4" />
                  Start Meeting
                </button>
              </div>
            </header>

            {/* Messages */}
            <div className="flex-1 overflow-auto p-6 space-y-4">
              {[
                {
                  user: "Sarah Johnson",
                  avatar: "👩‍💻",
                  message: "Hey team! I've uploaded the latest wireframes to the project folder. Let me know what you think!",
                  time: "10:30 AM",
                  isOwn: true,
                },
                {
                  user: "Michael Chen",
                  avatar: "👨‍🔬",
                  message: "Looking great! The navigation flow is much clearer now.",
                  time: "10:32 AM",
                  isOwn: false,
                },
                {
                  user: "Emma Davis",
                  avatar: "👩‍🎨",
                  message: "I love the color palette! Should we add more contrast to the CTAs?",
                  time: "10:35 AM",
                  isOwn: false,
                },
                {
                  user: "Sarah Johnson",
                  avatar: "👩‍💻",
                  message: "Good point! I'll create a few variations and share them in the next sync.",
                  time: "10:37 AM",
                  isOwn: true,
                },
                {
                  user: "John Smith",
                  avatar: "👨‍💻",
                  message: "Can we schedule a quick call to discuss the implementation? I have some questions about the animations.",
                  time: "10:40 AM",
                  isOwn: false,
                },
              ].map((msg, index) => (
                <div
                  key={index}
                  className={`flex gap-3 ${msg.isOwn ? "flex-row-reverse" : ""}`}
                >
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-600 to-purple-600 flex items-center justify-center text-white flex-shrink-0">
                    {msg.avatar}
                  </div>
                  <div className={`flex-1 max-w-lg ${msg.isOwn ? "items-end" : ""}`}>
                    <div className={`flex items-center gap-2 mb-1 ${msg.isOwn ? "flex-row-reverse" : ""}`}>
                      <span className="text-sm font-semibold">{msg.user}</span>
                      <span className="text-xs text-muted-foreground">{msg.time}</span>
                    </div>
                    <div
                      className={`p-4 rounded-2xl ${
                        msg.isOwn
                          ? "bg-gradient-to-r from-indigo-600 to-purple-600 text-white"
                          : "bg-card border border-border"
                      }`}
                    >
                      <p className="text-sm">{msg.message}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Message Input */}
            <div className="border-t border-border bg-card p-4">
              <div className="flex items-center gap-3">
                <button className="p-2 rounded-lg hover:bg-accent transition">
                  <Paperclip className="w-5 h-5" />
                </button>
                <input
                  type="text"
                  placeholder="Type a message..."
                  className="flex-1 px-4 py-3 bg-accent rounded-xl focus:outline-none focus:ring-2 focus:ring-ring"
                />
                <button className="p-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl hover:shadow-lg transition">
                  <Send className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>

          {/* Right Sidebar */}
          <aside className="w-80 border-l border-border bg-card p-6 overflow-auto">
            <div className="space-y-6">
              {/* Team Members */}
              <div>
                <h3 className="font-bold mb-4">Team Members (5)</h3>
                <div className="space-y-3">
                  {[
                    { name: "Sarah Johnson", role: "Product Designer", status: "online", avatar: "👩‍💻" },
                    { name: "Michael Chen", role: "Frontend Developer", status: "online", avatar: "👨‍🔬" },
                    { name: "Emma Davis", role: "UI Designer", status: "online", avatar: "👩‍🎨" },
                    { name: "John Smith", role: "Backend Developer", status: "online", avatar: "👨‍💻" },
                    { name: "Lisa Wang", role: "UX Researcher", status: "offline", avatar: "👩‍💼" },
                  ].map((member, index) => (
                    <div key={index} className="flex items-center gap-3 p-3 rounded-lg hover:bg-accent transition cursor-pointer">
                      <div className="relative">
                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-indigo-600 to-purple-600 flex items-center justify-center text-white text-lg">
                          {member.avatar}
                        </div>
                        <div
                          className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-card ${
                            member.status === "online" ? "bg-green-500" : "bg-slate-400"
                          }`}
                        ></div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-semibold truncate">{member.name}</div>
                        <div className="text-xs text-muted-foreground">{member.role}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Shared Documents */}
              <div>
                <h3 className="font-bold mb-4">Shared Documents</h3>
                <div className="space-y-2">
                  {[
                    { name: "Project Brief.pdf", type: "PDF", size: "2.4 MB" },
                    { name: "Design System.fig", type: "Figma", size: "5.1 MB" },
                    { name: "Meeting Notes.doc", type: "DOC", size: "856 KB" },
                  ].map((doc, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-3 p-3 bg-accent rounded-lg hover:bg-accent/70 transition cursor-pointer"
                    >
                      <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-indigo-100 to-purple-100 dark:from-indigo-950 dark:to-purple-950 flex items-center justify-center">
                        <FileText className="w-5 h-5 text-indigo-600" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-medium truncate">{doc.name}</div>
                        <div className="text-xs text-muted-foreground">
                          {doc.type} • {doc.size}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Quick Actions */}
              <div>
                <h3 className="font-bold mb-4">Quick Actions</h3>
                <div className="space-y-2">
                  <button className="w-full p-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg hover:shadow-lg transition flex items-center justify-center gap-2">
                    <Video className="w-4 h-4" />
                    Start Video Call
                  </button>
                  <button className="w-full p-3 border border-border rounded-lg hover:bg-accent transition flex items-center justify-center gap-2">
                    <Upload className="w-4 h-4" />
                    Share File
                  </button>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    );
  };

  // User Sidebar Component - Reusable
  const UserSidebar = ({ activePage }: { activePage: string }) => {
    const [collapsed, setCollapsed] = useState(false);

    return (
      <aside className={`${collapsed ? "w-20" : "w-64"} bg-sidebar border-r border-sidebar-border transition-all duration-300 flex flex-col`}>
        <div className="p-4 border-b border-sidebar-border">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-600 to-purple-600 flex items-center justify-center flex-shrink-0">
              <FolderKanban className="w-6 h-6 text-white" />
            </div>
            {!collapsed && <span className="text-lg font-bold">ProjectSphere</span>}
          </div>
        </div>

        <nav className="flex-1 p-4 space-y-2 overflow-auto">
          {[
            { icon: <LayoutDashboard className="w-5 h-5" />, label: "Dashboard", page: "dashboard" },
            { icon: <Plus className="w-5 h-5" />, label: "Post Project", page: "post-project" },
            { icon: <FolderKanban className="w-5 h-5" />, label: "My Projects", page: "my-projects" },
            { icon: <Users className="w-5 h-5" />, label: "Browse Makers", page: "browse-makers" },
            { icon: <MessageSquare className="w-5 h-5" />, label: "Messages", page: "customer-messages" },
            { icon: <DollarSign className="w-5 h-5" />, label: "Payments", page: "customer-payments" },
            { icon: <Star className="w-5 h-5" />, label: "Reviews", page: "customer-reviews" },
            { icon: <UserCircle2 className="w-5 h-5" />, label: "Profile", page: "profile" },
            { icon: <Settings className="w-5 h-5" />, label: "Settings", page: "customer-settings" },
          ].map((item, index) => (
            <motion.button
              key={index}
              onClick={() => setCurrentPage(item.page as any)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 ${
                activePage === item.page
                  ? "bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg"
                  : "text-sidebar-foreground hover:bg-sidebar-accent"
              }`}
              whileHover={{ x: 4, scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {item.icon}
              {!collapsed && <span className="text-sm font-medium">{item.label}</span>}
            </motion.button>
          ))}
        </nav>

        <div className="p-4 border-t border-sidebar-border">
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="w-full flex items-center justify-center p-2 rounded-lg hover:bg-sidebar-accent transition mb-2"
          >
            <Menu className="w-5 h-5" />
          </button>
          <button
            onClick={() => {
              setCurrentPage("login");
              setIsAdmin(false);
              setIsMaker(false);
            }}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-red-600 hover:bg-red-50 dark:hover:bg-red-950/20 transition-all"
          >
            <LogOut className="w-5 h-5 flex-shrink-0" />
            {!collapsed && <span className="text-sm font-medium">Logout</span>}
          </button>
        </div>
      </aside>
    );
  };

  // Post Project Page
  const PostProjectPage = () => {
    const [projectData, setProjectData] = useState({
      title: "",
      description: "",
      budget: "",
      category: "",
      deadline: "",
      skills: "",
    });

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();

      if (!projectData.title || !projectData.description || !projectData.budget || !projectData.category || !projectData.deadline) {
        showToast("Please fill in all required fields", "error");
        return;
      }

      createProject({
        title: projectData.title,
        description: projectData.description,
        budget: `$${projectData.budget}`,
        category: projectData.category,
        deadline: projectData.deadline,
        skills: projectData.skills ? projectData.skills.split(",").map(s => s.trim()) : [],
      });

      setCurrentPage("my-projects");
    };

    return (
      <div className="min-h-screen bg-background flex">
        <UserSidebar activePage="post-project" />

        <div className="flex-1 flex flex-col">
          <header className="h-16 border-b border-border bg-card flex items-center justify-between px-6">
            <h1 className="text-xl font-bold">Post a New Project</h1>
            <button onClick={toggleDarkMode} className="p-2 rounded-lg hover:bg-accent transition">
              {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
          </header>

          <main className="flex-1 overflow-auto p-6">
            <div className="max-w-4xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-card border border-border rounded-2xl p-8"
              >
                <h2 className="text-2xl font-bold mb-6">Project Details</h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium mb-2">Project Title *</label>
                    <input
                      type="text"
                      value={projectData.title}
                      onChange={(e) => setProjectData({ ...projectData, title: e.target.value })}
                      placeholder="E.g., Build a Mobile App for My Business"
                      className="w-full px-4 py-3 bg-input-background border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-ring"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Description *</label>
                    <textarea
                      value={projectData.description}
                      onChange={(e) => setProjectData({ ...projectData, description: e.target.value })}
                      rows={6}
                      placeholder="Describe your project in detail..."
                      className="w-full px-4 py-3 bg-input-background border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-ring resize-none"
                      required
                    />
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium mb-2">Budget (USD) *</label>
                      <input
                        type="number"
                        value={projectData.budget}
                        onChange={(e) => setProjectData({ ...projectData, budget: e.target.value })}
                        placeholder="500"
                        className="w-full px-4 py-3 bg-input-background border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-ring"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2">Category *</label>
                      <select
                        value={projectData.category}
                        onChange={(e) => setProjectData({ ...projectData, category: e.target.value })}
                        className="w-full px-4 py-3 bg-input-background border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-ring"
                        required
                      >
                        <option value="">Select category</option>
                        <option value="Web Development">Web Development</option>
                        <option value="Mobile Development">Mobile Development</option>
                        <option value="Design">Design</option>
                        <option value="Marketing">Marketing</option>
                        <option value="Writing">Writing & Content</option>
                        <option value="Video">Video & Animation</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Skills Required</label>
                    <input
                      type="text"
                      value={projectData.skills}
                      onChange={(e) => setProjectData({ ...projectData, skills: e.target.value })}
                      placeholder="React, Node.js, MongoDB (comma-separated)"
                      className="w-full px-4 py-3 bg-input-background border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-ring"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Deadline *</label>
                    <input
                      type="text"
                      value={projectData.deadline}
                      onChange={(e) => setProjectData({ ...projectData, deadline: e.target.value })}
                      placeholder="e.g., 2 weeks, 1 month"
                      className="w-full px-4 py-3 bg-input-background border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-ring"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Attachments</label>
                    <div className="border-2 border-dashed border-border rounded-xl p-8 text-center hover:border-primary transition cursor-pointer">
                      <Upload className="w-12 h-12 mx-auto mb-3 text-muted-foreground" />
                      <p className="text-sm text-muted-foreground mb-1">Drop files here or click to upload</p>
                      <p className="text-xs text-muted-foreground">PDF, DOC, PNG, JPG up to 10MB</p>
                    </div>
                  </div>

                  <div className="flex gap-4 pt-4">
                    <button
                      type="button"
                      onClick={() => setCurrentPage("dashboard")}
                      className="flex-1 px-6 py-3 border border-border rounded-xl font-semibold hover:bg-accent transition"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="flex-1 px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl font-semibold hover:shadow-lg transition"
                    >
                      Post Project
                    </button>
                  </div>
                </form>
              </motion.div>
            </div>
          </main>
        </div>
      </div>
    );
  };

  // My Projects Page
  const MyProjectsPage = () => {
    const [statusFilter, setStatusFilter] = useState<"All" | "Active" | "In Progress" | "Completed" | "Pending">("All");
    const myProjects = projects.filter((p) => p.ownerId === currentUserId);
    const filteredProjects = statusFilter === "All" ? myProjects : myProjects.filter((p) => p.status === statusFilter);

    return (
      <div className="min-h-screen bg-background flex">
        <UserSidebar activePage="my-projects" />

        <div className="flex-1 flex flex-col">
          <header className="h-16 border-b border-border bg-card flex items-center justify-between px-6">
            <h1 className="text-xl font-bold">My Projects</h1>
            <div className="flex items-center gap-3">
              <button onClick={toggleDarkMode} className="p-2 rounded-lg hover:bg-accent transition">
                {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </button>
              <button
                onClick={() => setCurrentPage("post-project")}
                className="px-4 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg hover:shadow-lg transition flex items-center gap-2"
              >
                <Plus className="w-4 h-4" />
                New Project
              </button>
            </div>
          </header>

          <main className="flex-1 overflow-auto p-6">
            <div className="max-w-7xl mx-auto space-y-6">
              {/* Filters */}
              <div className="flex gap-3">
                {(["All", "Active", "In Progress", "Completed", "Pending"] as const).map((filter) => (
                  <button
                    key={filter}
                    onClick={() => setStatusFilter(filter)}
                    className={`px-4 py-2 rounded-lg font-medium transition ${
                      filter === statusFilter
                        ? "bg-gradient-to-r from-indigo-600 to-purple-600 text-white"
                        : "bg-card border border-border hover:bg-accent"
                    }`}
                  >
                    {filter}
                  </button>
                ))}
              </div>

              {/* Projects Grid */}
              <div className="grid lg:grid-cols-2 gap-6">
                {filteredProjects.length === 0 ? (
                  <div className="col-span-2 text-center py-12">
                    <p className="text-muted-foreground">No projects found</p>
                  </div>
                ) : (
                  filteredProjects.map((project) => (
                  <motion.div
                    key={project.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-card border border-border rounded-2xl p-6 hover:shadow-xl transition-all cursor-pointer"
                    whileHover={{ scale: 1.02 }}
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-lg font-bold mb-1">{project.title}</h3>
                        <p className="text-sm text-muted-foreground">Budget: {project.budget}</p>
                      </div>
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${
                          project.status === "Completed"
                            ? "bg-green-100 dark:bg-green-950/50 text-green-700 dark:text-green-400"
                            : project.status === "In Progress"
                            ? "bg-blue-100 dark:bg-blue-950/50 text-blue-700 dark:text-blue-400"
                            : "bg-yellow-100 dark:bg-yellow-950/50 text-yellow-700 dark:text-yellow-400"
                        }`}
                      >
                        {project.status}
                      </span>
                    </div>

                    <div className="space-y-3 mb-4">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Progress</span>
                        <span className="font-semibold">{project.progress}%</span>
                      </div>
                      <div className="w-full h-2 bg-accent rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full transition-all"
                          style={{ width: `${project.progress}%` }}
                        ></div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t border-border">
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Users className="w-4 h-4" />
                          {project.applicants} applicants
                        </div>
                        <div className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          {project.deadline}
                        </div>
                      </div>
                      <div className="flex gap-2">
                        {project.status === "Completed" && project.makerId && (
                          <button
                            onClick={() => {
                              setSelectedProject(project);
                              setShowReviewModal(true);
                            }}
                            className="px-3 py-1 text-sm bg-yellow-100 dark:bg-yellow-950/50 text-yellow-700 dark:text-yellow-400 rounded-lg hover:bg-yellow-200 dark:hover:bg-yellow-950 transition"
                          >
                            Leave Review
                          </button>
                        )}
                        {project.applicants > 0 && project.status === "Pending" && (
                          <button
                            onClick={() => {
                              const projectBids = bids.filter(b => b.projectId === project.id);
                              if (projectBids.length > 0) {
                                acceptBid(projectBids[0].id);
                              }
                            }}
                            className="px-3 py-1 text-sm bg-indigo-100 dark:bg-indigo-950/50 text-indigo-700 dark:text-indigo-400 rounded-lg hover:bg-indigo-200 dark:hover:bg-indigo-950 transition"
                          >
                            View Bids
                          </button>
                        )}
                      </div>
                    </div>
                  </motion.div>
                )))}
              </div>
            </div>
          </main>
        </div>
      </div>
    );
  };

  // Browse Makers Page
  const BrowseMakersPage = () => {
    const makers = [
      { id: "1", name: "Alex Thompson", avatar: "👨‍💻", role: "Full Stack Developer", rating: 4.9, reviews: 156, hourly: "$85/hr", skills: ["React", "Node.js", "TypeScript"], available: true },
      { id: "2", name: "Sarah Chen", avatar: "👩‍🎨", role: "UI/UX Designer", rating: 5.0, reviews: 203, hourly: "$75/hr", skills: ["Figma", "Adobe XD", "Sketch"], available: true },
      { id: "3", name: "Michael Brown", avatar: "👨‍🔬", role: "Mobile Developer", rating: 4.8, reviews: 128, hourly: "$90/hr", skills: ["React Native", "Flutter", "Swift"], available: false },
      { id: "4", name: "Emma Wilson", avatar: "👩‍💼", role: "Digital Marketer", rating: 4.7, reviews: 94, hourly: "$60/hr", skills: ["SEO", "Content", "Social Media"], available: true },
      { id: "5", name: "David Lee", avatar: "👨‍🎨", role: "Graphic Designer", rating: 4.9, reviews: 187, hourly: "$70/hr", skills: ["Photoshop", "Illustrator", "Branding"], available: true },
      { id: "6", name: "Lisa Anderson", avatar: "👩‍💻", role: "Backend Developer", rating: 5.0, reviews: 142, hourly: "$95/hr", skills: ["Python", "Django", "AWS"], available: true },
    ];

    return (
      <div className="min-h-screen bg-background flex">
        <UserSidebar activePage="browse-makers" />

        <div className="flex-1 flex flex-col">
          <header className="h-16 border-b border-border bg-card flex items-center justify-between px-6">
            <h1 className="text-xl font-bold">Browse Makers</h1>
            <button onClick={toggleDarkMode} className="p-2 rounded-lg hover:bg-accent transition">
              {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
          </header>

          <main className="flex-1 overflow-auto p-6">
            <div className="max-w-7xl mx-auto space-y-6">
              {/* Search and Filters */}
              <div className="bg-card border border-border rounded-2xl p-4">
                <div className="flex flex-wrap gap-4">
                  <div className="flex-1 min-w-[300px]">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <input
                        type="text"
                        placeholder="Search by skills, name, or category..."
                        className="w-full pl-9 pr-4 py-2 bg-accent rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                      />
                    </div>
                  </div>
                  <select className="px-4 py-2 bg-accent rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-ring">
                    <option>All Categories</option>
                    <option>Development</option>
                    <option>Design</option>
                    <option>Marketing</option>
                    <option>Writing</option>
                  </select>
                  <select className="px-4 py-2 bg-accent rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-ring">
                    <option>All Ratings</option>
                    <option>5 Stars</option>
                    <option>4+ Stars</option>
                    <option>3+ Stars</option>
                  </select>
                  <button className="px-4 py-2 bg-accent rounded-lg hover:bg-accent/70 transition flex items-center gap-2">
                    <Filter className="w-4 h-4" />
                    More Filters
                  </button>
                </div>
              </div>

              {/* Makers Grid */}
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {makers.map((maker) => (
                  <motion.div
                    key={maker.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-card border border-border rounded-2xl p-6 hover:shadow-xl transition-all"
                    whileHover={{ y: -4 }}
                  >
                    <div className="flex items-start gap-4 mb-4">
                      <div className="w-16 h-16 rounded-full bg-gradient-to-br from-indigo-600 to-purple-600 flex items-center justify-center text-3xl">
                        {maker.avatar}
                      </div>
                      <div className="flex-1">
                        <h3 className="font-bold mb-1">{maker.name}</h3>
                        <p className="text-sm text-muted-foreground mb-2">{maker.role}</p>
                        <div className="flex items-center gap-1 mb-1">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} className={`w-3 h-3 ${i < Math.floor(maker.rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`} />
                          ))}
                          <span className="text-xs text-muted-foreground ml-1">
                            {maker.rating} ({maker.reviews})
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2 mb-4">
                      {maker.skills.map((skill, index) => (
                        <span key={index} className="px-2 py-1 bg-accent rounded text-xs font-medium">
                          {skill}
                        </span>
                      ))}
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t border-border">
                      <div>
                        <div className="text-lg font-bold text-primary">{maker.hourly}</div>
                        <div className={`text-xs ${maker.available ? "text-green-600" : "text-red-600"}`}>
                          {maker.available ? "Available" : "Busy"}
                        </div>
                      </div>
                      <button className="px-4 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg hover:shadow-lg transition text-sm">
                        View Profile
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </main>
        </div>
      </div>
    );
  };

  // Customer Messages Page
  const CustomerMessagesPage = () => {
    const conversations = [
      { id: "1", name: "Alex Thompson", avatar: "👨‍💻", lastMessage: "Sounds good! Let's discuss the timeline.", time: "2m ago", unread: 2 },
      { id: "2", name: "Sarah Chen", avatar: "👩‍🎨", lastMessage: "I've updated the designs", time: "1h ago", unread: 0 },
      { id: "3", name: "Michael Brown", avatar: "👨‍🔬", lastMessage: "When can we start the project?", time: "3h ago", unread: 1 },
    ];

    return (
      <div className="min-h-screen bg-background flex">
        <UserSidebar activePage="customer-messages" />

        <div className="flex-1 flex flex-col">
          <header className="h-16 border-b border-border bg-card flex items-center justify-between px-6">
            <h1 className="text-xl font-bold">Messages</h1>
            <button onClick={toggleDarkMode} className="p-2 rounded-lg hover:bg-accent transition">
              {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
          </header>

          <div className="flex-1 flex">
            {/* Conversations List */}
            <div className="w-80 border-r border-border bg-card">
              <div className="p-4 border-b border-border">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <input
                    type="text"
                    placeholder="Search messages..."
                    className="w-full pl-9 pr-4 py-2 bg-accent rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                  />
                </div>
              </div>

              <div className="overflow-auto">
                {conversations.map((conv) => (
                  <div
                    key={conv.id}
                    className="p-4 border-b border-border hover:bg-accent cursor-pointer transition"
                  >
                    <div className="flex items-start gap-3">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-indigo-600 to-purple-600 flex items-center justify-center text-2xl flex-shrink-0">
                        {conv.avatar}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-1">
                          <h3 className="font-semibold truncate">{conv.name}</h3>
                          <span className="text-xs text-muted-foreground">{conv.time}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <p className="text-sm text-muted-foreground truncate">{conv.lastMessage}</p>
                          {conv.unread > 0 && (
                            <span className="ml-2 w-5 h-5 rounded-full bg-primary text-white text-xs flex items-center justify-center flex-shrink-0">
                              {conv.unread}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Chat Area */}
            <div className="flex-1 flex flex-col">
              <div className="p-4 border-b border-border flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-600 to-purple-600 flex items-center justify-center text-xl">
                    👨‍💻
                  </div>
                  <div>
                    <h3 className="font-semibold">Alex Thompson</h3>
                    <p className="text-xs text-green-600">Online</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button className="p-2 rounded-lg hover:bg-accent transition">
                    <Video className="w-5 h-5" />
                  </button>
                  <button className="p-2 rounded-lg hover:bg-accent transition">
                    <MoreVertical className="w-5 h-5" />
                  </button>
                </div>
              </div>

              <div className="flex-1 p-6 overflow-auto">
                <div className="space-y-4">
                  <div className="flex gap-3">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-600 to-purple-600 flex items-center justify-center text-sm">
                      👨‍💻
                    </div>
                    <div className="flex-1 max-w-lg">
                      <div className="bg-card border border-border rounded-2xl p-4">
                        <p className="text-sm">Hi! I'd love to work on your mobile app project.</p>
                      </div>
                      <span className="text-xs text-muted-foreground mt-1 block">10:30 AM</span>
                    </div>
                  </div>

                  <div className="flex gap-3 flex-row-reverse">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center text-sm">
                      👩‍💻
                    </div>
                    <div className="flex-1 max-w-lg">
                      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-2xl p-4">
                        <p className="text-sm">Great! Can you share your portfolio?</p>
                      </div>
                      <span className="text-xs text-muted-foreground mt-1 block text-right">10:32 AM</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-4 border-t border-border">
                <div className="flex gap-3">
                  <button className="p-2 rounded-lg hover:bg-accent transition">
                    <Paperclip className="w-5 h-5" />
                  </button>
                  <input
                    type="text"
                    placeholder="Type a message..."
                    className="flex-1 px-4 py-2 bg-accent rounded-lg focus:outline-none focus:ring-2 focus:ring-ring"
                  />
                  <button className="px-4 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg hover:shadow-lg transition">
                    <Send className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Maker Messages Page
  const MakerMessagesPage = () => {
    const conversations = [
      { id: "1", name: "Sarah Johnson", avatar: "👩‍💼", lastMessage: "When can you start the project?", time: "2m ago", unread: 1 },
      { id: "2", name: "Tech Startup Inc", avatar: "🏢", lastMessage: "The milestone looks great!", time: "1h ago", unread: 0 },
      { id: "3", name: "Emma Davis", avatar: "👩‍🎨", lastMessage: "Thanks for the quick turnaround", time: "3h ago", unread: 0 },
    ];

    return (
      <div className="min-h-screen bg-background flex">
        <MakerSidebar activePage="maker-messages" />

        <div className="flex-1 flex flex-col">
          <header className="h-16 border-b border-border bg-card flex items-center justify-between px-6">
            <h1 className="text-xl font-bold">Messages</h1>
            <button onClick={toggleDarkMode} className="p-2 rounded-lg hover:bg-accent transition">
              {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
          </header>

          <div className="flex-1 flex">
            {/* Conversations List */}
            <div className="w-80 border-r border-border bg-card">
              <div className="p-4 border-b border-border">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <input
                    type="text"
                    placeholder="Search messages..."
                    className="w-full pl-9 pr-4 py-2 bg-accent rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                  />
                </div>
              </div>

              <div className="overflow-auto">
                {conversations.map((conv) => (
                  <div
                    key={conv.id}
                    className="p-4 border-b border-border hover:bg-accent cursor-pointer transition"
                  >
                    <div className="flex items-start gap-3">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-green-600 to-emerald-600 flex items-center justify-center text-2xl flex-shrink-0">
                        {conv.avatar}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-1">
                          <h3 className="font-semibold truncate">{conv.name}</h3>
                          <span className="text-xs text-muted-foreground">{conv.time}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <p className="text-sm text-muted-foreground truncate">{conv.lastMessage}</p>
                          {conv.unread > 0 && (
                            <span className="ml-2 w-5 h-5 rounded-full bg-green-600 text-white text-xs flex items-center justify-center flex-shrink-0">
                              {conv.unread}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Chat Area */}
            <div className="flex-1 flex flex-col">
              <div className="p-4 border-b border-border flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-green-600 to-emerald-600 flex items-center justify-center text-xl">
                    👩‍💼
                  </div>
                  <div>
                    <h3 className="font-semibold">Sarah Johnson</h3>
                    <p className="text-xs text-green-600">Online</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button className="p-2 rounded-lg hover:bg-accent transition">
                    <Video className="w-5 h-5" />
                  </button>
                  <button className="p-2 rounded-lg hover:bg-accent transition">
                    <MoreVertical className="w-5 h-5" />
                  </button>
                </div>
              </div>

              <div className="flex-1 p-6 overflow-auto">
                <div className="space-y-4">
                  <div className="flex gap-3">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-600 to-purple-600 flex items-center justify-center text-sm">
                      👩‍💼
                    </div>
                    <div className="flex-1 max-w-lg">
                      <div className="bg-card border border-border rounded-2xl p-4">
                        <p className="text-sm">Hi Alex! I reviewed your portfolio and I'm impressed. When can you start?</p>
                      </div>
                      <span className="text-xs text-muted-foreground mt-1 block">10:30 AM</span>
                    </div>
                  </div>

                  <div className="flex gap-3 flex-row-reverse">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-green-600 to-emerald-600 flex items-center justify-center text-sm">
                      👨‍💻
                    </div>
                    <div className="flex-1 max-w-lg">
                      <div className="bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-2xl p-4">
                        <p className="text-sm">Thank you! I can start this week. Let me send you a detailed project plan.</p>
                      </div>
                      <span className="text-xs text-muted-foreground mt-1 block text-right">10:32 AM</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-4 border-t border-border">
                <div className="flex gap-3">
                  <button className="p-2 rounded-lg hover:bg-accent transition">
                    <Paperclip className="w-5 h-5" />
                  </button>
                  <input
                    type="text"
                    placeholder="Type a message..."
                    className="flex-1 px-4 py-2 bg-accent rounded-lg focus:outline-none focus:ring-2 focus:ring-ring"
                  />
                  <button className="px-4 py-2 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-lg hover:shadow-lg transition">
                    <Send className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Customer Payments Page
  const CustomerPaymentsPage = () => {
    const transactions = [
      { id: "1", project: "Mobile App Design", amount: "$2,500", status: "Completed", date: "Dec 15, 2024", type: "Payment" },
      { id: "2", project: "Website Redesign", amount: "$900", status: "Pending", date: "Dec 20, 2024", type: "Milestone" },
      { id: "3", project: "Logo Design", amount: "$500", status: "Completed", date: "Dec 10, 2024", type: "Payment" },
      { id: "4", project: "Marketing Campaign", amount: "$1,500", status: "In Progress", date: "Dec 22, 2024", type: "Milestone" },
    ];

    return (
      <div className="min-h-screen bg-background flex">
        <UserSidebar activePage="customer-payments" />

        <div className="flex-1 flex flex-col">
          <header className="h-16 border-b border-border bg-card flex items-center justify-between px-6">
            <h1 className="text-xl font-bold">Payments</h1>
            <button onClick={toggleDarkMode} className="p-2 rounded-lg hover:bg-accent transition">
              {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
          </header>

          <main className="flex-1 overflow-auto p-6">
            <div className="max-w-7xl mx-auto space-y-6">
              {/* Balance Cards */}
              <div className="grid md:grid-cols-3 gap-6">
                <div className="bg-gradient-to-br from-indigo-600 to-purple-600 text-white rounded-2xl p-6">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-sm opacity-90">Total Spent</span>
                    <DollarSign className="w-5 h-5 opacity-90" />
                  </div>
                  <div className="text-3xl font-bold mb-1">$5,400</div>
                  <div className="text-xs opacity-75">Across 4 projects</div>
                </div>

                <div className="bg-card border border-border rounded-2xl p-6">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-sm text-muted-foreground">Pending Payments</span>
                    <Clock className="w-5 h-5 text-muted-foreground" />
                  </div>
                  <div className="text-3xl font-bold mb-1">$2,400</div>
                  <div className="text-xs text-muted-foreground">2 pending transactions</div>
                </div>

                <div className="bg-card border border-border rounded-2xl p-6">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-sm text-muted-foreground">Available Balance</span>
                    <CheckCircle2 className="w-5 h-5 text-green-600" />
                  </div>
                  <div className="text-3xl font-bold mb-1">$3,000</div>
                  <div className="text-xs text-muted-foreground">Ready to use</div>
                </div>
              </div>

              {/* Transaction History */}
              <div className="bg-card border border-border rounded-2xl overflow-hidden">
                <div className="p-6 border-b border-border">
                  <h2 className="text-lg font-bold">Transaction History</h2>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-accent border-b border-border">
                      <tr>
                        <th className="px-6 py-4 text-left text-sm font-semibold">Project</th>
                        <th className="px-6 py-4 text-left text-sm font-semibold">Amount</th>
                        <th className="px-6 py-4 text-left text-sm font-semibold">Type</th>
                        <th className="px-6 py-4 text-left text-sm font-semibold">Status</th>
                        <th className="px-6 py-4 text-left text-sm font-semibold">Date</th>
                        <th className="px-6 py-4 text-left text-sm font-semibold">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border">
                      {transactions.map((transaction) => (
                        <tr key={transaction.id} className="hover:bg-accent/50 transition">
                          <td className="px-6 py-4 font-semibold">{transaction.project}</td>
                          <td className="px-6 py-4 text-lg font-bold text-primary">{transaction.amount}</td>
                          <td className="px-6 py-4 text-sm text-muted-foreground">{transaction.type}</td>
                          <td className="px-6 py-4">
                            <span
                              className={`inline-flex px-3 py-1 rounded-full text-xs font-medium ${
                                transaction.status === "Completed"
                                  ? "bg-green-100 dark:bg-green-950/50 text-green-700 dark:text-green-400"
                                  : transaction.status === "Pending"
                                  ? "bg-yellow-100 dark:bg-yellow-950/50 text-yellow-700 dark:text-yellow-400"
                                  : "bg-blue-100 dark:bg-blue-950/50 text-blue-700 dark:text-blue-400"
                              }`}
                            >
                              {transaction.status}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-sm text-muted-foreground">{transaction.date}</td>
                          <td className="px-6 py-4">
                            <button className="p-2 rounded-lg hover:bg-accent transition">
                              <Download className="w-4 h-4" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    );
  };

  // Customer Reviews Page
  const CustomerReviewsPage = () => {
    const reviews = [
      { id: "1", project: "Mobile App Design", maker: "Alex Thompson", rating: 5, comment: "Excellent work! Very professional and delivered on time.", date: "Dec 15, 2024" },
      { id: "2", project: "Website Redesign", maker: "Sarah Chen", rating: 4, comment: "Great designer, good communication throughout the project.", date: "Dec 10, 2024" },
      { id: "3", project: "Logo Design", maker: "Michael Brown", rating: 5, comment: "Exceeded expectations! Highly recommended.", date: "Dec 5, 2024" },
    ];

    return (
      <div className="min-h-screen bg-background flex">
        <UserSidebar activePage="customer-reviews" />

        <div className="flex-1 flex flex-col">
          <header className="h-16 border-b border-border bg-card flex items-center justify-between px-6">
            <h1 className="text-xl font-bold">Reviews</h1>
            <button onClick={toggleDarkMode} className="p-2 rounded-lg hover:bg-accent transition">
              {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
          </header>

          <main className="flex-1 overflow-auto p-6">
            <div className="max-w-4xl mx-auto space-y-6">
              {/* Rating Summary */}
              <div className="bg-card border border-border rounded-2xl p-6">
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="text-center">
                    <div className="text-6xl font-bold mb-2">4.8</div>
                    <div className="flex items-center justify-center gap-1 mb-2">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                    <div className="text-sm text-muted-foreground">Based on {reviews.length} reviews</div>
                  </div>

                  <div className="space-y-2">
                    {[5, 4, 3, 2, 1].map((stars) => (
                      <div key={stars} className="flex items-center gap-3">
                        <span className="text-sm w-8">{stars} ★</span>
                        <div className="flex-1 h-2 bg-accent rounded-full overflow-hidden">
                          <div
                            className="h-full bg-yellow-400"
                            style={{ width: `${stars === 5 ? 70 : stars === 4 ? 20 : 10}%` }}
                          ></div>
                        </div>
                        <span className="text-sm text-muted-foreground w-12 text-right">
                          {stars === 5 ? "70%" : stars === 4 ? "20%" : "10%"}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Reviews List */}
              <div className="space-y-4">
                {reviews.map((review) => (
                  <motion.div
                    key={review.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-card border border-border rounded-2xl p-6"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="font-bold mb-1">{review.project}</h3>
                        <p className="text-sm text-muted-foreground">For {review.maker}</p>
                      </div>
                      <div className="flex items-center gap-1">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-4 h-4 ${i < review.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
                          />
                        ))}
                      </div>
                    </div>

                    <p className="text-sm mb-4 p-4 bg-accent rounded-lg">{review.comment}</p>

                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <span>{review.date}</span>
                      <button className="text-primary hover:underline">Edit Review</button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </main>
        </div>
      </div>
    );
  };

  // Maker Reviews Page
  const MakerReviewsPage = () => {
    const reviews = [
      { id: "1", project: "Website Redesign", client: "Sarah Johnson", rating: 5, comment: "Alex delivered exceptional work! Highly recommended.", date: "Dec 15, 2024" },
      { id: "2", project: "Mobile App Development", client: "Tech Startup Inc", rating: 5, comment: "Professional and timely delivery. Will work with again.", date: "Dec 10, 2024" },
      { id: "3", project: "Brand Guidelines", client: "Emma Davis", rating: 4, comment: "Great work overall, minor revisions needed but handled well.", date: "Dec 5, 2024" },
    ];

    return (
      <div className="min-h-screen bg-background flex">
        <MakerSidebar activePage="maker-reviews" />

        <div className="flex-1 flex flex-col">
          <header className="h-16 border-b border-border bg-card flex items-center justify-between px-6">
            <h1 className="text-xl font-bold">Reviews</h1>
            <button onClick={toggleDarkMode} className="p-2 rounded-lg hover:bg-accent transition">
              {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
          </header>

          <main className="flex-1 overflow-auto p-6">
            <div className="max-w-4xl mx-auto space-y-6">
              {/* Rating Summary */}
              <div className="bg-card border border-border rounded-2xl p-6">
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="text-center">
                    <div className="text-6xl font-bold mb-2">4.9</div>
                    <div className="flex items-center justify-center gap-1 mb-2">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                    <div className="text-sm text-muted-foreground">Based on {reviews.length} reviews</div>
                  </div>

                  <div className="space-y-2">
                    {[5, 4, 3, 2, 1].map((stars) => (
                      <div key={stars} className="flex items-center gap-3">
                        <span className="text-sm w-8">{stars} ★</span>
                        <div className="flex-1 h-2 bg-accent rounded-full overflow-hidden">
                          <div
                            className="h-full bg-yellow-400"
                            style={{ width: `${stars === 5 ? 80 : stars === 4 ? 15 : 5}%` }}
                          ></div>
                        </div>
                        <span className="text-sm text-muted-foreground w-12 text-right">
                          {stars === 5 ? "80%" : stars === 4 ? "15%" : "5%"}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Reviews List */}
              <div className="space-y-4">
                {reviews.map((review) => (
                  <motion.div
                    key={review.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-card border border-border rounded-2xl p-6"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="font-bold mb-1">{review.project}</h3>
                        <p className="text-sm text-muted-foreground">From {review.client}</p>
                      </div>
                      <div className="flex items-center gap-1">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-4 h-4 ${i < review.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
                          />
                        ))}
                      </div>
                    </div>

                    <p className="text-sm mb-4 p-4 bg-accent rounded-lg">{review.comment}</p>

                    <div className="text-xs text-muted-foreground">{review.date}</div>
                  </motion.div>
                ))}
              </div>
            </div>
          </main>
        </div>
      </div>
    );
  };

  // Customer Settings Page
  const CustomerSettingsPage = () => {
    return (
      <div className="min-h-screen bg-background flex">
        <UserSidebar activePage="customer-settings" />

        <div className="flex-1 flex flex-col">
          <header className="h-16 border-b border-border bg-card flex items-center justify-between px-6">
            <h1 className="text-xl font-bold">Settings</h1>
            <button onClick={toggleDarkMode} className="p-2 rounded-lg hover:bg-accent transition">
              {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
          </header>

          <main className="flex-1 overflow-auto p-6">
            <div className="max-w-4xl mx-auto space-y-6">
              {/* Account Settings */}
              <div className="bg-card border border-border rounded-2xl p-6">
                <h2 className="text-lg font-bold mb-6">Account Settings</h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Full Name</label>
                    <input
                      type="text"
                      defaultValue="Sarah Johnson"
                      className="w-full px-4 py-3 bg-input-background border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-ring"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Email</label>
                    <input
                      type="email"
                      defaultValue="sarah.j@university.edu"
                      className="w-full px-4 py-3 bg-input-background border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-ring"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Phone</label>
                    <input
                      type="tel"
                      defaultValue="+1 (555) 123-4567"
                      className="w-full px-4 py-3 bg-input-background border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-ring"
                    />
                  </div>
                </div>
              </div>

              {/* Notification Preferences */}
              <div className="bg-card border border-border rounded-2xl p-6">
                <h2 className="text-lg font-bold mb-6">Notifications</h2>
                <div className="space-y-3">
                  {[
                    { label: "Email notifications for new messages", enabled: true },
                    { label: "Project updates and milestones", enabled: true },
                    { label: "Payment confirmations", enabled: true },
                    { label: "Weekly activity summary", enabled: false },
                    { label: "Marketing emails", enabled: false },
                  ].map((item, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-accent rounded-lg">
                      <span className="text-sm font-medium">{item.label}</span>
                      <button
                        className={`w-12 h-6 rounded-full transition ${
                          item.enabled ? "bg-green-600" : "bg-gray-300 dark:bg-gray-600"
                        }`}
                      >
                        <div
                          className={`w-5 h-5 bg-white rounded-full shadow transition transform ${
                            item.enabled ? "translate-x-6" : "translate-x-0.5"
                          }`}
                        ></div>
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Privacy Settings */}
              <div className="bg-card border border-border rounded-2xl p-6">
                <h2 className="text-lg font-bold mb-6">Privacy</h2>
                <div className="space-y-3">
                  {[
                    { label: "Show profile to public", enabled: true },
                    { label: "Allow search engines to index my profile", enabled: false },
                    { label: "Show online status", enabled: true },
                  ].map((item, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-accent rounded-lg">
                      <span className="text-sm font-medium">{item.label}</span>
                      <button
                        className={`w-12 h-6 rounded-full transition ${
                          item.enabled ? "bg-green-600" : "bg-gray-300 dark:bg-gray-600"
                        }`}
                      >
                        <div
                          className={`w-5 h-5 bg-white rounded-full shadow transition transform ${
                            item.enabled ? "translate-x-6" : "translate-x-0.5"
                          }`}
                        ></div>
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Save Button */}
              <div className="flex justify-end gap-3">
                <button className="px-6 py-3 border border-border rounded-xl hover:bg-accent transition">
                  Cancel
                </button>
                <button className="px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl font-semibold hover:shadow-lg transition">
                  Save Changes
                </button>
              </div>
            </div>
          </main>
        </div>
      </div>
    );
  };

  // Maker Settings Page
  const MakerSettingsPage = () => {
    return (
      <div className="min-h-screen bg-background flex">
        <MakerSidebar activePage="maker-settings" />

        <div className="flex-1 flex flex-col">
          <header className="h-16 border-b border-border bg-card flex items-center justify-between px-6">
            <h1 className="text-xl font-bold">Settings</h1>
            <button onClick={toggleDarkMode} className="p-2 rounded-lg hover:bg-accent transition">
              {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
          </header>

          <main className="flex-1 overflow-auto p-6">
            <div className="max-w-4xl mx-auto space-y-6">
              {/* Account Settings */}
              <div className="bg-card border border-border rounded-2xl p-6">
                <h2 className="text-lg font-bold mb-6">Account Settings</h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Full Name</label>
                    <input
                      type="text"
                      defaultValue="Alex Thompson"
                      className="w-full px-4 py-3 bg-input-background border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-ring"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Email</label>
                    <input
                      type="email"
                      defaultValue="alex.t@email.com"
                      className="w-full px-4 py-3 bg-input-background border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-ring"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Phone</label>
                    <input
                      type="tel"
                      defaultValue="+1 (555) 987-6543"
                      className="w-full px-4 py-3 bg-input-background border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-ring"
                    />
                  </div>
                </div>
              </div>

              {/* Notification Preferences */}
              <div className="bg-card border border-border rounded-2xl p-6">
                <h2 className="text-lg font-bold mb-6">Notifications</h2>
                <div className="space-y-3">
                  {[
                    { label: "Email notifications for new project matches", enabled: true },
                    { label: "Bid acceptance notifications", enabled: true },
                    { label: "Payment confirmations", enabled: true },
                    { label: "Client messages", enabled: true },
                    { label: "Marketing emails", enabled: false },
                  ].map((item, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-accent rounded-lg">
                      <span className="text-sm font-medium">{item.label}</span>
                      <button
                        className={`w-12 h-6 rounded-full transition ${
                          item.enabled ? "bg-green-600" : "bg-gray-300 dark:bg-gray-600"
                        }`}
                      >
                        <div
                          className={`w-5 h-5 bg-white rounded-full shadow transition transform ${
                            item.enabled ? "translate-x-6" : "translate-x-0.5"
                          }`}
                        ></div>
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Privacy Settings */}
              <div className="bg-card border border-border rounded-2xl p-6">
                <h2 className="text-lg font-bold mb-6">Privacy</h2>
                <div className="space-y-3">
                  {[
                    { label: "Show profile to clients", enabled: true },
                    { label: "Allow search engines to index my profile", enabled: true },
                    { label: "Show online status", enabled: true },
                  ].map((item, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-accent rounded-lg">
                      <span className="text-sm font-medium">{item.label}</span>
                      <button
                        className={`w-12 h-6 rounded-full transition ${
                          item.enabled ? "bg-green-600" : "bg-gray-300 dark:bg-gray-600"
                        }`}
                      >
                        <div
                          className={`w-5 h-5 bg-white rounded-full shadow transition transform ${
                            item.enabled ? "translate-x-6" : "translate-x-0.5"
                          }`}
                        ></div>
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Save Button */}
              <div className="flex justify-end gap-3">
                <button className="px-6 py-3 border border-border rounded-xl hover:bg-accent transition">
                  Cancel
                </button>
                <button className="px-6 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-xl font-semibold hover:shadow-lg transition">
                  Save Changes
                </button>
              </div>
            </div>
          </main>
        </div>
      </div>
    );
  };

  // Customer Profile Page
  const ProfilePage = () => {
    return (
      <div className="min-h-screen bg-background flex">
        <UserSidebar activePage="profile" />

        {/* Main Content */}
        <div className="flex-1 flex flex-col">
          {/* Top Bar */}
          <header className="h-16 border-b border-border bg-card flex items-center justify-between px-6">
            <h1 className="text-xl font-bold">Profile</h1>
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-lg hover:bg-accent transition"
            >
              {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
          </header>

          {/* Profile Content */}
          <main className="flex-1 overflow-auto p-6">
            <div className="max-w-5xl mx-auto space-y-6">
              {/* Profile Header */}
              <div className="bg-card border border-border rounded-2xl overflow-hidden">
                <div className="h-32 bg-gradient-to-r from-indigo-600 to-purple-600"></div>
                <div className="px-8 pb-8">
                  <div className="flex items-end gap-6 -mt-16 mb-6">
                    <div className="w-32 h-32 rounded-2xl bg-gradient-to-br from-indigo-600 to-purple-600 border-4 border-card flex items-center justify-center text-white text-5xl">
                      👩‍💻
                    </div>
                    <div className="flex-1 pb-4">
                      <h1 className="text-3xl font-bold mb-2">Sarah Johnson</h1>
                      <p className="text-muted-foreground">Product Designer • Computer Science Student</p>
                    </div>
                    <button className="px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl hover:shadow-lg transition mb-4">
                      Edit Profile
                    </button>
                  </div>

                  <div className="flex gap-8">
                    <div>
                      <div className="text-2xl font-bold">12</div>
                      <div className="text-sm text-muted-foreground">Projects</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold">48</div>
                      <div className="text-sm text-muted-foreground">Tasks</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold">24</div>
                      <div className="text-sm text-muted-foreground">Team Members</div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid lg:grid-cols-3 gap-6">
                {/* Left Column */}
                <div className="lg:col-span-2 space-y-6">
                  {/* About */}
                  <div className="bg-card border border-border rounded-2xl p-6">
                    <h2 className="text-xl font-bold mb-4">About</h2>
                    <p className="text-muted-foreground leading-relaxed">
                      Passionate product designer and computer science student with a love for creating
                      intuitive user experiences. Experienced in UI/UX design, prototyping, and
                      user research. Always eager to learn and collaborate on innovative projects.
                    </p>
                  </div>

                  {/* Skills */}
                  <div className="bg-card border border-border rounded-2xl p-6">
                    <h2 className="text-xl font-bold mb-4">Skills & Interests</h2>
                    <div className="flex flex-wrap gap-2">
                      {[
                        "UI/UX Design",
                        "Figma",
                        "Product Design",
                        "User Research",
                        "Prototyping",
                        "Wireframing",
                        "Design Systems",
                        "React",
                        "TypeScript",
                        "CSS",
                      ].map((skill, index) => (
                        <span
                          key={index}
                          className="px-4 py-2 bg-gradient-to-r from-indigo-100 to-purple-100 dark:from-indigo-950/50 dark:to-purple-950/50 text-indigo-700 dark:text-indigo-400 rounded-full text-sm font-medium"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Completed Projects */}
                  <div className="bg-card border border-border rounded-2xl p-6">
                    <h2 className="text-xl font-bold mb-4">Completed Projects</h2>
                    <div className="space-y-4">
                      {[
                        {
                          name: "E-commerce Mobile App",
                          description: "Designed complete user flows and UI for shopping app",
                          completion: "Nov 2024",
                        },
                        {
                          name: "Portfolio Website",
                          description: "Built responsive portfolio with React and Tailwind",
                          completion: "Oct 2024",
                        },
                        {
                          name: "Task Management Dashboard",
                          description: "Designed and prototyped productivity dashboard",
                          completion: "Sep 2024",
                        },
                      ].map((project, index) => (
                        <div
                          key={index}
                          className="p-4 border border-border rounded-xl hover:border-primary hover:shadow-md transition cursor-pointer"
                        >
                          <div className="flex items-start justify-between mb-2">
                            <h3 className="font-semibold">{project.name}</h3>
                            <span className="text-xs px-3 py-1 bg-green-100 dark:bg-green-950/50 text-green-700 dark:text-green-400 rounded-full">
                              Completed
                            </span>
                          </div>
                          <p className="text-sm text-muted-foreground mb-2">{project.description}</p>
                          <p className="text-xs text-muted-foreground">{project.completion}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Right Column */}
                <div className="space-y-6">
                  {/* Contact Info */}
                  <div className="bg-card border border-border rounded-2xl p-6">
                    <h2 className="text-xl font-bold mb-4">Contact</h2>
                    <div className="space-y-3">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-accent flex items-center justify-center">
                          <Mail className="w-5 h-5 text-muted-foreground" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="text-xs text-muted-foreground">Email</div>
                          <div className="text-sm truncate">sarah.j@university.edu</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-accent flex items-center justify-center">
                          <Github className="w-5 h-5 text-muted-foreground" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="text-xs text-muted-foreground">GitHub</div>
                          <div className="text-sm truncate">@sarahjohnson</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Achievements */}
                  <div className="bg-card border border-border rounded-2xl p-6">
                    <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                      <Trophy className="w-5 h-5 text-yellow-500" />
                      Achievements
                    </h2>
                    <div className="space-y-3">
                      {[
                        { icon: "🏆", title: "Top Contributor", desc: "Most active this month" },
                        { icon: "⭐", title: "Quick Starter", desc: "Completed 5 projects" },
                        { icon: "🎯", title: "Team Player", desc: "Helped 10+ teammates" },
                        { icon: "🔥", title: "On Fire", desc: "7 day streak" },
                      ].map((achievement, index) => (
                        <div
                          key={index}
                          className="flex items-center gap-3 p-3 bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-yellow-950/20 dark:to-orange-950/20 rounded-xl"
                        >
                          <div className="text-2xl">{achievement.icon}</div>
                          <div>
                            <div className="text-sm font-semibold">{achievement.title}</div>
                            <div className="text-xs text-muted-foreground">{achievement.desc}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Activity Stats */}
                  <div className="bg-card border border-border rounded-2xl p-6">
                    <h2 className="text-xl font-bold mb-4">Activity</h2>
                    <div className="space-y-4">
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm text-muted-foreground">Tasks Completed</span>
                          <span className="text-sm font-semibold">85%</span>
                        </div>
                        <div className="w-full h-2 bg-accent rounded-full overflow-hidden">
                          <div className="h-full w-[85%] bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full"></div>
                        </div>
                      </div>
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm text-muted-foreground">Project Progress</span>
                          <span className="text-sm font-semibold">72%</span>
                        </div>
                        <div className="w-full h-2 bg-accent rounded-full overflow-hidden">
                          <div className="h-full w-[72%] bg-gradient-to-r from-purple-600 to-pink-600 rounded-full"></div>
                        </div>
                      </div>
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm text-muted-foreground">Team Collaboration</span>
                          <span className="text-sm font-semibold">95%</span>
                        </div>
                        <div className="w-full h-2 bg-accent rounded-full overflow-hidden">
                          <div className="h-full w-[95%] bg-gradient-to-r from-cyan-600 to-teal-600 rounded-full"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    );
  };

  // Active Projects Page (Customer)
  const ActiveProjectsPage = () => {
    return (
      <div className="min-h-screen bg-background flex">
        <UserSidebar activePage="my-projects" />

        <div className="flex-1 flex flex-col">
          <header className="h-16 border-b border-border bg-card flex items-center justify-between px-6">
            <h1 className="text-xl font-bold">Active Projects</h1>
            <button onClick={toggleDarkMode} className="p-2 rounded-lg hover:bg-accent transition">
              {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
          </header>

          <main className="flex-1 overflow-auto p-6">
            <div className="max-w-7xl mx-auto space-y-6">
              <div className="grid lg:grid-cols-2 gap-6">
                {[
                  { id: "1", title: "Mobile App Design", status: "In Progress", budget: "$2,500", deadline: "Dec 25, 2024", progress: 75, maker: "Alex Thompson" },
                  { id: "2", title: "Website Redesign", status: "Active", budget: "$1,800", deadline: "Dec 30, 2024", progress: 45, maker: "Sarah Chen" },
                  { id: "3", title: "Marketing Campaign", status: "In Progress", budget: "$3,000", deadline: "Jan 10, 2025", progress: 60, maker: "Michael Brown" },
                ].map((project) => (
                  <motion.div
                    key={project.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-card border border-border rounded-2xl p-6 hover:shadow-xl transition-all"
                    whileHover={{ scale: 1.02 }}
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-lg font-bold mb-1">{project.title}</h3>
                        <p className="text-sm text-muted-foreground">Maker: {project.maker}</p>
                      </div>
                      <span className="px-3 py-1 rounded-full text-xs font-medium bg-blue-100 dark:bg-blue-950/50 text-blue-700 dark:text-blue-400">
                        {project.status}
                      </span>
                    </div>
                    <div className="space-y-3 mb-4">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Progress</span>
                        <span className="font-semibold">{project.progress}%</span>
                      </div>
                      <div className="w-full h-2 bg-accent rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full transition-all"
                          style={{ width: `${project.progress}%` }}
                        ></div>
                      </div>
                    </div>
                    <div className="flex items-center justify-between pt-4 border-t border-border">
                      <div className="text-sm text-muted-foreground">
                        <div className="font-bold text-primary text-lg">{project.budget}</div>
                        <div>Due: {project.deadline}</div>
                      </div>
                      <button className="px-4 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg hover:shadow-lg transition text-sm">
                        View Details
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </main>
        </div>
      </div>
    );
  };

  // Completed Projects Page (Customer)
  const CompletedProjectsPage = () => {
    return (
      <div className="min-h-screen bg-background flex">
        <UserSidebar activePage="my-projects" />

        <div className="flex-1 flex flex-col">
          <header className="h-16 border-b border-border bg-card flex items-center justify-between px-6">
            <h1 className="text-xl font-bold">Completed Projects</h1>
            <button onClick={toggleDarkMode} className="p-2 rounded-lg hover:bg-accent transition">
              {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
          </header>

          <main className="flex-1 overflow-auto p-6">
            <div className="max-w-7xl mx-auto space-y-6">
              <div className="grid lg:grid-cols-2 gap-6">
                {[
                  { id: "1", title: "Logo Design", budget: "$500", completedDate: "Dec 15, 2024", maker: "Emma Wilson", rating: 5 },
                  { id: "2", title: "Brand Guidelines", budget: "$1,200", completedDate: "Dec 10, 2024", maker: "David Lee", rating: 5 },
                  { id: "3", title: "Social Media Content", budget: "$800", completedDate: "Dec 5, 2024", maker: "Lisa Anderson", rating: 4 },
                ].map((project) => (
                  <motion.div
                    key={project.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-card border border-border rounded-2xl p-6 hover:shadow-xl transition-all"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-lg font-bold mb-1">{project.title}</h3>
                        <p className="text-sm text-muted-foreground">Maker: {project.maker}</p>
                      </div>
                      <span className="px-3 py-1 rounded-full text-xs font-medium bg-green-100 dark:bg-green-950/50 text-green-700 dark:text-green-400">
                        Completed
                      </span>
                    </div>
                    <div className="flex items-center gap-1 mb-4">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${i < project.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
                        />
                      ))}
                    </div>
                    <div className="flex items-center justify-between pt-4 border-t border-border">
                      <div className="text-sm text-muted-foreground">
                        <div className="font-bold text-primary text-lg">{project.budget}</div>
                        <div>Completed: {project.completedDate}</div>
                      </div>
                      <button
                        onClick={() => setCurrentPage("reviews")}
                        className="px-4 py-2 border border-border rounded-lg hover:bg-accent transition text-sm"
                      >
                        Leave Review
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </main>
        </div>
      </div>
    );
  };

  // Pending Projects Page (Customer)
  const PendingProjectsPage = () => {
    return (
      <div className="min-h-screen bg-background flex">
        <UserSidebar activePage="my-projects" />

        <div className="flex-1 flex flex-col">
          <header className="h-16 border-b border-border bg-card flex items-center justify-between px-6">
            <h1 className="text-xl font-bold">Pending Projects</h1>
            <button onClick={toggleDarkMode} className="p-2 rounded-lg hover:bg-accent transition">
              {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
          </header>

          <main className="flex-1 overflow-auto p-6">
            <div className="max-w-7xl mx-auto space-y-6">
              <div className="grid lg:grid-cols-2 gap-6">
                {[
                  { id: "1", title: "Video Editing", budget: "$600", postedDate: "2 hours ago", applicants: 8 },
                  { id: "2", title: "WordPress Website", budget: "$1,200", postedDate: "1 day ago", applicants: 6 },
                ].map((project) => (
                  <motion.div
                    key={project.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-card border border-border rounded-2xl p-6 hover:shadow-xl transition-all"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-lg font-bold mb-1">{project.title}</h3>
                        <p className="text-sm text-muted-foreground">Posted {project.postedDate}</p>
                      </div>
                      <span className="px-3 py-1 rounded-full text-xs font-medium bg-yellow-100 dark:bg-yellow-950/50 text-yellow-700 dark:text-yellow-400">
                        Pending
                      </span>
                    </div>
                    <div className="flex items-center justify-between pt-4 border-t border-border">
                      <div className="text-sm text-muted-foreground">
                        <div className="font-bold text-primary text-lg">{project.budget}</div>
                        <div>{project.applicants} applicants</div>
                      </div>
                      <button
                        onClick={() => setCurrentPage("browse-makers")}
                        className="px-4 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg hover:shadow-lg transition text-sm"
                      >
                        View Applicants
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </main>
        </div>
      </div>
    );
  };

  // Maker Sidebar Component
  const MakerSidebar = ({ activePage }: { activePage: string }) => {
    const [collapsed, setCollapsed] = useState(false);

    return (
      <aside className={`${collapsed ? "w-20" : "w-64"} bg-sidebar border-r border-sidebar-border transition-all duration-300 flex flex-col`}>
        <div className="p-4 border-b border-sidebar-border">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-green-600 to-emerald-600 flex items-center justify-center flex-shrink-0">
              <Briefcase className="w-6 h-6 text-white" />
            </div>
            {!collapsed && <span className="text-lg font-bold">Maker Portal</span>}
          </div>
        </div>

        <nav className="flex-1 p-4 space-y-2 overflow-auto">
          {[
            { icon: <LayoutDashboard className="w-5 h-5" />, label: "Dashboard", page: "maker-dashboard" },
            { icon: <Search className="w-5 h-5" />, label: "Available Projects", page: "available-projects" },
            { icon: <Target className="w-5 h-5" />, label: "My Bids", page: "my-bids" },
            { icon: <Zap className="w-5 h-5" />, label: "Active Work", page: "active-work" },
            { icon: <DollarSign className="w-5 h-5" />, label: "Earnings", page: "earnings" },
            { icon: <MessageSquare className="w-5 h-5" />, label: "Messages", page: "maker-messages" },
            { icon: <Star className="w-5 h-5" />, label: "Reviews", page: "maker-reviews" },
            { icon: <UserCircle2 className="w-5 h-5" />, label: "Profile", page: "maker-profile" },
            { icon: <Settings className="w-5 h-5" />, label: "Settings", page: "maker-settings" },
          ].map((item, index) => (
            <motion.button
              key={index}
              onClick={() => setCurrentPage(item.page as any)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 ${
                activePage === item.page
                  ? "bg-gradient-to-r from-green-600 to-emerald-600 text-white shadow-lg"
                  : "text-sidebar-foreground hover:bg-sidebar-accent"
              }`}
              whileHover={{ x: 4, scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {item.icon}
              {!collapsed && <span className="text-sm font-medium">{item.label}</span>}
            </motion.button>
          ))}
        </nav>

        <div className="p-4 border-t border-sidebar-border">
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="w-full flex items-center justify-center p-2 rounded-lg hover:bg-sidebar-accent transition mb-2"
          >
            <Menu className="w-5 h-5" />
          </button>
          <button
            onClick={() => {
              setCurrentPage("login");
              setIsMaker(false);
            }}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-red-600 hover:bg-red-50 dark:hover:bg-red-950/20 transition-all"
          >
            <LogOut className="w-5 h-5 flex-shrink-0" />
            {!collapsed && <span className="text-sm font-medium">Logout</span>}
          </button>
        </div>
      </aside>
    );
  };

  // Maker Dashboard Page
  const MakerDashboardPage = () => {
    const myActiveProjects = projects.filter((p) => p.makerId === currentUserId && p.status === "In Progress");
    const myBids = bids.filter((b) => b.makerId === currentUserId);
    const pendingBidsCount = myBids.filter((b) => b.status === "Pending").length;
    const acceptedBidsCount = myBids.filter((b) => b.status === "Accepted").length;
    const myReviews = reviews.filter((r) => r.revieweeId === currentUserId);
    const avgRating = myReviews.length > 0
      ? (myReviews.reduce((sum, r) => sum + r.rating, 0) / myReviews.length).toFixed(1)
      : "0.0";
    const totalEarnings = myActiveProjects.reduce((sum, p) => {
      const budget = parseInt(p.budget.replace(/[$,]/g, ""));
      return sum + (isNaN(budget) ? 0 : budget);
    }, 0);

    return (
      <div className="min-h-screen bg-background flex">
        <MakerSidebar activePage="maker-dashboard" />

        <div className="flex-1 flex flex-col">
          <header className="h-16 border-b border-border bg-card flex items-center justify-between px-6">
            <h1 className="text-xl font-bold">Maker Dashboard</h1>
            <div className="flex items-center gap-3">
              <button onClick={toggleDarkMode} className="p-2 rounded-lg hover:bg-accent transition">
                {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </button>
              <button
                onClick={() => setShowNotifications(!showNotifications)}
                className="relative p-2 rounded-lg hover:bg-accent transition"
              >
                <Bell className="w-5 h-5" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>
              <button
                onClick={() => setShowProfileDropdown(!showProfileDropdown)}
                className="flex items-center gap-3 pl-3 border-l border-border"
              >
                <div className="text-right">
                  <div className="text-sm font-semibold">{currentUserName}</div>
                  <div className="text-xs text-muted-foreground">Maker</div>
                </div>
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-green-600 to-emerald-600 flex items-center justify-center text-white font-semibold">
                  {currentUserName.split(' ').map(n => n[0]).join('')}
                </div>
              </button>
            </div>
          </header>

          <main className="flex-1 overflow-auto p-6">
            <div className="max-w-7xl mx-auto space-y-6">
              <div>
                <h1 className="text-3xl font-bold mb-2">Welcome back, {currentUserName.split(' ')[0]}! 👋</h1>
                <p className="text-muted-foreground">Here's your maker activity today.</p>
              </div>

              {/* Stats Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                  { label: "Active Projects", value: myActiveProjects.length.toString(), change: `${acceptedBidsCount} accepted bids`, icon: <Zap />, color: "from-green-600 to-emerald-600" },
                  { label: "Total Earnings", value: `$${totalEarnings.toLocaleString()}`, change: `${myActiveProjects.length} projects`, icon: <DollarSign />, color: "from-blue-600 to-cyan-600" },
                  { label: "Pending Bids", value: pendingBidsCount.toString(), change: `${myBids.length} total bids`, icon: <Target />, color: "from-purple-600 to-pink-600" },
                  { label: "Avg Rating", value: avgRating, change: `${myReviews.length} reviews`, icon: <Star />, color: "from-orange-600 to-amber-600" },
                ].map((stat, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-card border border-border rounded-2xl p-6 hover:shadow-lg transition-shadow"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center text-white`}>
                        {stat.icon}
                      </div>
                      <div className="text-xs text-green-600 dark:text-green-400">{stat.change}</div>
                    </div>
                    <div className="text-3xl font-bold mb-1">{stat.value}</div>
                    <div className="text-sm text-muted-foreground">{stat.label}</div>
                  </motion.div>
                ))}
              </div>

              {/* Available Projects & Active Work */}
              <div className="grid lg:grid-cols-2 gap-6">
                {/* New Available Projects */}
                <div className="bg-card border border-border rounded-2xl p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-bold">New Available Projects</h2>
                    <button
                      onClick={() => setCurrentPage("available-projects")}
                      className="text-sm text-primary hover:underline flex items-center gap-1"
                    >
                      View all
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="space-y-4">
                    {projects.filter((p) => p.status === "Pending" || p.status === "Active").slice(0, 3).map((project) => (
                      <motion.div
                        key={project.id}
                        className="p-4 border border-border rounded-xl hover:border-primary hover:shadow-md transition-all cursor-pointer"
                        whileHover={{ scale: 1.02 }}
                        onClick={() => setCurrentPage("available-projects")}
                      >
                        <div className="flex items-start justify-between mb-3">
                          <div>
                            <h3 className="font-semibold mb-1">{project.title}</h3>
                            <p className="text-lg font-bold text-green-600">{project.budget}</p>
                          </div>
                          <span className="text-xs px-3 py-1 bg-blue-100 dark:bg-blue-950/50 text-blue-700 dark:text-blue-400 rounded-full">
                            {project.applicants} bids
                          </span>
                        </div>
                        <div className="flex flex-wrap gap-2 mb-3">
                          {project.skills.map((skill, i) => (
                            <span key={i} className="px-2 py-1 bg-accent rounded text-xs">{skill}</span>
                          ))}
                        </div>
                        <div className="flex items-center justify-between text-sm text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            {project.deadline}
                          </div>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedProject(project);
                              setShowBidModal(true);
                            }}
                            className="px-3 py-1 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-lg text-xs hover:shadow-lg transition"
                          >
                            Place Bid
                          </button>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Active Work */}
                <div className="bg-card border border-border rounded-2xl p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-bold">Active Work</h2>
                    <button
                      onClick={() => setCurrentPage("active-work")}
                      className="text-sm text-primary hover:underline flex items-center gap-1"
                    >
                      View all
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="space-y-4">
                    {myActiveProjects.length === 0 ? (
                      <p className="text-sm text-muted-foreground text-center py-8">No active projects yet</p>
                    ) : (
                      myActiveProjects.slice(0, 3).map((work) => (
                        <div
                          key={work.id}
                          className="p-4 border border-border rounded-xl hover:border-primary hover:shadow-md transition-all cursor-pointer"
                          onClick={() => setCurrentPage("active-work")}
                        >
                          <div className="flex items-start justify-between mb-3">
                            <div>
                              <h3 className="font-semibold mb-1">{work.title}</h3>
                              <p className="text-sm text-muted-foreground">Client: {work.ownerName}</p>
                            </div>
                          </div>
                          <div className="space-y-2">
                            <div className="flex items-center justify-between text-sm">
                              <span className="text-muted-foreground">Progress</span>
                              <span className="font-semibold">{work.progress}%</span>
                            </div>
                            <div className="w-full h-2 bg-accent rounded-full overflow-hidden">
                              <div
                                className="h-full bg-gradient-to-r from-green-600 to-emerald-600 rounded-full transition-all"
                                style={{ width: `${work.progress}%` }}
                              ></div>
                            </div>
                            <div className="flex items-center gap-1 text-xs text-muted-foreground">
                              <Calendar className="w-3 h-3" />
                              Due: {work.deadline}
                            </div>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              </div>

              {/* Recent Activity */}
              <div className="bg-card border border-border rounded-2xl p-6">
                <h2 className="text-xl font-bold mb-6">Recent Activity</h2>
                <div className="space-y-4">
                  {[
                    { user: "Sarah Johnson", action: "accepted your bid on", target: "Website Redesign", time: "2 hours ago" },
                    { user: "Tech Startup Inc", action: "sent a message about", target: "Mobile App Development", time: "5 hours ago" },
                    { user: "You", action: "submitted work for", target: "Brand Guidelines", time: "1 day ago" },
                    { user: "Emma Davis", action: "left a 5-star review for", target: "Logo Design", time: "2 days ago" },
                  ].map((activity, index) => (
                    <div key={index} className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-green-600 to-emerald-600 flex items-center justify-center text-white flex-shrink-0">
                        {activity.user.charAt(0)}
                      </div>
                      <div className="flex-1">
                        <p className="text-sm">
                          <span className="font-semibold">{activity.user}</span>{" "}
                          <span className="text-muted-foreground">{activity.action}</span>{" "}
                          <span className="font-semibold">{activity.target}</span>
                        </p>
                        <p className="text-xs text-muted-foreground">{activity.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    );
  };

  // Available Projects Page (Maker)
  const AvailableProjectsPage = () => {
    const availableProjects = projects.filter((p) => p.status === "Pending" || p.status === "Active");

    return (
      <div className="min-h-screen bg-background flex">
        <MakerSidebar activePage="available-projects" />

        <div className="flex-1 flex flex-col">
          <header className="h-16 border-b border-border bg-card flex items-center justify-between px-6">
            <h1 className="text-xl font-bold">Available Projects</h1>
            <button onClick={toggleDarkMode} className="p-2 rounded-lg hover:bg-accent transition">
              {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
          </header>

          <main className="flex-1 overflow-auto p-6">
            <div className="max-w-7xl mx-auto space-y-6">
              {/* Search and Filters */}
              <div className="bg-card border border-border rounded-2xl p-4">
                <div className="flex flex-wrap gap-4">
                  <div className="flex-1 min-w-[300px]">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <input
                        type="text"
                        placeholder="Search projects by skills, title, or keywords..."
                        className="w-full pl-9 pr-4 py-2 bg-accent rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                      />
                    </div>
                  </div>
                  <select className="px-4 py-2 bg-accent rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-ring">
                    <option>All Categories</option>
                    <option>Development</option>
                    <option>Design</option>
                    <option>Marketing</option>
                    <option>Writing</option>
                  </select>
                  <select className="px-4 py-2 bg-accent rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-ring">
                    <option>All Budgets</option>
                    <option>$0-$500</option>
                    <option>$500-$1,000</option>
                    <option>$1,000-$5,000</option>
                    <option>$5,000+</option>
                  </select>
                </div>
              </div>

              {/* Projects List */}
              <div className="space-y-4">
                {availableProjects.length === 0 ? (
                  <div className="text-center py-12">
                    <p className="text-muted-foreground">No available projects at the moment</p>
                  </div>
                ) : (
                  availableProjects.map((project) => (
                    <motion.div
                      key={project.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="bg-card border border-border rounded-2xl p-6 hover:shadow-xl transition-all"
                    >
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                          <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                          <p className="text-sm text-muted-foreground mb-3">{project.description}</p>
                          <div className="flex flex-wrap gap-2 mb-3">
                            {project.skills.map((skill, i) => (
                              <span key={i} className="px-3 py-1 bg-accent rounded-full text-xs font-medium">{skill}</span>
                            ))}
                          </div>
                          <div className="flex items-center gap-4 text-sm text-muted-foreground">
                            <div className="flex items-center gap-1">
                              <UserCircle2 className="w-4 h-4" />
                              {project.ownerName}
                            </div>
                            <div className="flex items-center gap-1">
                              <Clock className="w-4 h-4" />
                              Posted {project.postedDate}
                            </div>
                            <div className="flex items-center gap-1">
                              <Target className="w-4 h-4" />
                              {project.applicants} bids
                            </div>
                            <div className="flex items-center gap-1">
                              <Calendar className="w-4 h-4" />
                              Due in {project.deadline}
                            </div>
                          </div>
                        </div>
                        <div className="ml-6 text-right">
                          <div className="text-2xl font-bold text-green-600 mb-3">{project.budget}</div>
                          <button
                            onClick={() => {
                              setSelectedProject(project);
                              setShowBidModal(true);
                            }}
                            className="px-6 py-2 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-lg hover:shadow-lg transition"
                          >
                            Place Bid
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  ))
                )}
              </div>
            </div>
          </main>
        </div>
      </div>
    );
  };

  // My Bids Page (Maker)
  const MyBidsPage = () => {
    const [statusFilter, setStatusFilter] = useState<"All" | "Pending" | "Accepted" | "Rejected">("All");
    const myBids = bids.filter((b) => b.makerId === currentUserId);
    const filteredBids = statusFilter === "All" ? myBids : myBids.filter((b) => b.status === statusFilter);

    return (
      <div className="min-h-screen bg-background flex">
        <MakerSidebar activePage="my-bids" />

        <div className="flex-1 flex flex-col">
          <header className="h-16 border-b border-border bg-card flex items-center justify-between px-6">
            <h1 className="text-xl font-bold">My Bids</h1>
            <button onClick={toggleDarkMode} className="p-2 rounded-lg hover:bg-accent transition">
              {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
          </header>

          <main className="flex-1 overflow-auto p-6">
            <div className="max-w-7xl mx-auto space-y-6">
              {/* Filters */}
              <div className="flex gap-3">
                {(["All", "Pending", "Accepted", "Rejected"] as const).map((filter) => (
                  <button
                    key={filter}
                    onClick={() => setStatusFilter(filter)}
                    className={`px-4 py-2 rounded-lg font-medium transition ${
                      filter === statusFilter
                        ? "bg-gradient-to-r from-green-600 to-emerald-600 text-white"
                        : "bg-card border border-border hover:bg-accent"
                    }`}
                  >
                    {filter}
                  </button>
                ))}
              </div>

              {/* Bids List */}
              <div className="bg-card border border-border rounded-2xl overflow-hidden">
                <div className="overflow-x-auto">
                  {filteredBids.length === 0 ? (
                    <div className="text-center py-12">
                      <p className="text-muted-foreground">No bids found</p>
                    </div>
                  ) : (
                    <table className="w-full">
                      <thead className="bg-accent border-b border-border">
                        <tr>
                          <th className="px-6 py-4 text-left text-sm font-semibold">Project</th>
                          <th className="px-6 py-4 text-left text-sm font-semibold">Bid Amount</th>
                          <th className="px-6 py-4 text-left text-sm font-semibold">Status</th>
                          <th className="px-6 py-4 text-left text-sm font-semibold">Submitted</th>
                          <th className="px-6 py-4 text-left text-sm font-semibold">Proposal</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-border">
                        {filteredBids.map((bid) => (
                          <tr key={bid.id} className="hover:bg-accent/50 transition">
                            <td className="px-6 py-4 font-semibold">{bid.projectTitle}</td>
                            <td className="px-6 py-4 text-lg font-bold text-green-600">{bid.amount}</td>
                            <td className="px-6 py-4">
                              <span
                                className={`inline-flex px-3 py-1 rounded-full text-xs font-medium ${
                                  bid.status === "Accepted"
                                    ? "bg-green-100 dark:bg-green-950/50 text-green-700 dark:text-green-400"
                                    : bid.status === "Pending"
                                    ? "bg-yellow-100 dark:bg-yellow-950/50 text-yellow-700 dark:text-yellow-400"
                                    : "bg-red-100 dark:bg-red-950/50 text-red-700 dark:text-red-400"
                                }`}
                              >
                                {bid.status}
                              </span>
                            </td>
                            <td className="px-6 py-4 text-sm text-muted-foreground">{bid.submittedDate}</td>
                            <td className="px-6 py-4 text-sm text-muted-foreground max-w-xs truncate">{bid.proposal}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  )}
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    );
  };

  // Active Work Page (Maker)
  const ActiveWorkPage = () => {
    const activeProjects = projects.filter((p) => p.makerId === currentUserId && p.status === "In Progress");

    return (
      <div className="min-h-screen bg-background flex">
        <MakerSidebar activePage="active-work" />

        <div className="flex-1 flex flex-col">
          <header className="h-16 border-b border-border bg-card flex items-center justify-between px-6">
            <h1 className="text-xl font-bold">Active Work</h1>
            <button onClick={toggleDarkMode} className="p-2 rounded-lg hover:bg-accent transition">
              {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
          </header>

          <main className="flex-1 overflow-auto p-6">
            <div className="max-w-7xl mx-auto space-y-6">
              <div className="grid lg:grid-cols-2 gap-6">
                {activeProjects.length === 0 ? (
                  <div className="col-span-2 text-center py-12">
                    <p className="text-muted-foreground">No active projects at the moment</p>
                  </div>
                ) : (
                  activeProjects.map((project) => (
                    <motion.div
                      key={project.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="bg-card border border-border rounded-2xl p-6 hover:shadow-xl transition-all"
                      whileHover={{ scale: 1.02 }}
                    >
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h3 className="text-lg font-bold mb-1">{project.title}</h3>
                          <p className="text-sm text-muted-foreground">Client: {project.ownerName}</p>
                        </div>
                        <div className="text-right">
                          <div className="text-xl font-bold text-green-600">{project.budget}</div>
                        </div>
                      </div>

                      <div className="space-y-3 mb-4">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">Progress</span>
                          <span className="font-semibold">{project.progress}%</span>
                        </div>
                        <div className="w-full h-2 bg-accent rounded-full overflow-hidden">
                          <div
                            className="h-full bg-gradient-to-r from-green-600 to-emerald-600 rounded-full transition-all"
                            style={{ width: `${project.progress}%` }}
                          ></div>
                        </div>
                      </div>

                      <div className="flex items-center justify-between pt-4 border-t border-border">
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            Due: {project.deadline}
                          </div>
                        </div>
                        <button
                          onClick={() => {
                            setSelectedProject(project);
                            setCurrentPage("customer-messages");
                          }}
                          className="px-4 py-2 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-lg hover:shadow-lg transition text-sm"
                        >
                          Contact Client
                        </button>
                      </div>
                    </motion.div>
                  ))
                )}
              </div>
            </div>
          </main>
        </div>
      </div>
    );
  };

  // Earnings Page (Maker)
  const EarningsPage = () => {
    const transactions = [
      { id: "1", project: "Website Redesign", client: "Sarah Johnson", amount: "$1,750", status: "Completed", date: "Dec 15, 2024", type: "Milestone Payment" },
      { id: "2", project: "Mobile App Development", client: "Tech Startup Inc", amount: "$2,000", status: "Pending", date: "Dec 20, 2024", type: "Milestone Payment" },
      { id: "3", project: "Brand Guidelines", client: "Emma Davis", amount: "$1,200", status: "Completed", date: "Dec 10, 2024", type: "Full Payment" },
      { id: "4", project: "Logo Design", client: "John Smith", amount: "$500", status: "Completed", date: "Dec 5, 2024", type: "Full Payment" },
    ];

    return (
      <div className="min-h-screen bg-background flex">
        <MakerSidebar activePage="earnings" />

        <div className="flex-1 flex flex-col">
          <header className="h-16 border-b border-border bg-card flex items-center justify-between px-6">
            <h1 className="text-xl font-bold">Earnings</h1>
            <button onClick={toggleDarkMode} className="p-2 rounded-lg hover:bg-accent transition">
              {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
          </header>

          <main className="flex-1 overflow-auto p-6">
            <div className="max-w-7xl mx-auto space-y-6">
              {/* Earnings Cards */}
              <div className="grid md:grid-cols-3 gap-6">
                <div className="bg-gradient-to-br from-green-600 to-emerald-600 text-white rounded-2xl p-6">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-sm opacity-90">Total Earned</span>
                    <DollarSign className="w-5 h-5 opacity-90" />
                  </div>
                  <div className="text-3xl font-bold mb-1">$8,450</div>
                  <div className="text-xs opacity-75">Lifetime earnings</div>
                </div>

                <div className="bg-card border border-border rounded-2xl p-6">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-sm text-muted-foreground">Pending</span>
                    <Clock className="w-5 h-5 text-muted-foreground" />
                  </div>
                  <div className="text-3xl font-bold mb-1">$2,000</div>
                  <div className="text-xs text-muted-foreground">Awaiting payment</div>
                </div>

                <div className="bg-card border border-border rounded-2xl p-6">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-sm text-muted-foreground">Available</span>
                    <CheckCircle2 className="w-5 h-5 text-green-600" />
                  </div>
                  <div className="text-3xl font-bold mb-1">$6,450</div>
                  <div className="text-xs text-muted-foreground">Ready to withdraw</div>
                </div>
              </div>

              {/* Transaction History */}
              <div className="bg-card border border-border rounded-2xl overflow-hidden">
                <div className="p-6 border-b border-border">
                  <h2 className="text-lg font-bold">Transaction History</h2>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-accent border-b border-border">
                      <tr>
                        <th className="px-6 py-4 text-left text-sm font-semibold">Project</th>
                        <th className="px-6 py-4 text-left text-sm font-semibold">Client</th>
                        <th className="px-6 py-4 text-left text-sm font-semibold">Amount</th>
                        <th className="px-6 py-4 text-left text-sm font-semibold">Type</th>
                        <th className="px-6 py-4 text-left text-sm font-semibold">Status</th>
                        <th className="px-6 py-4 text-left text-sm font-semibold">Date</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border">
                      {transactions.map((transaction) => (
                        <tr key={transaction.id} className="hover:bg-accent/50 transition">
                          <td className="px-6 py-4 font-semibold">{transaction.project}</td>
                          <td className="px-6 py-4 text-sm text-muted-foreground">{transaction.client}</td>
                          <td className="px-6 py-4 text-lg font-bold text-green-600">{transaction.amount}</td>
                          <td className="px-6 py-4 text-sm text-muted-foreground">{transaction.type}</td>
                          <td className="px-6 py-4">
                            <span
                              className={`inline-flex px-3 py-1 rounded-full text-xs font-medium ${
                                transaction.status === "Completed"
                                  ? "bg-green-100 dark:bg-green-950/50 text-green-700 dark:text-green-400"
                                  : "bg-yellow-100 dark:bg-yellow-950/50 text-yellow-700 dark:text-yellow-400"
                              }`}
                            >
                              {transaction.status}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-sm text-muted-foreground">{transaction.date}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    );
  };

  // Maker Profile Page
  const MakerProfilePage = () => {
    return (
      <div className="min-h-screen bg-background flex">
        <MakerSidebar activePage="maker-profile" />

        <div className="flex-1 flex flex-col">
          <header className="h-16 border-b border-border bg-card flex items-center justify-between px-6">
            <h1 className="text-xl font-bold">Maker Profile</h1>
            <button onClick={toggleDarkMode} className="p-2 rounded-lg hover:bg-accent transition">
              {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
          </header>

          <main className="flex-1 overflow-auto p-6">
            <div className="max-w-5xl mx-auto space-y-6">
              {/* Profile Header */}
              <div className="bg-card border border-border rounded-2xl overflow-hidden">
                <div className="h-32 bg-gradient-to-r from-green-600 to-emerald-600"></div>
                <div className="px-8 pb-8">
                  <div className="flex items-end gap-6 -mt-16 mb-6">
                    <div className="w-32 h-32 rounded-2xl bg-gradient-to-br from-green-600 to-emerald-600 border-4 border-card flex items-center justify-center text-white text-5xl">
                      👨‍💻
                    </div>
                    <div className="flex-1 pb-4">
                      <h1 className="text-3xl font-bold mb-2">Alex Thompson</h1>
                      <p className="text-muted-foreground">Full Stack Developer • React & Node.js Expert</p>
                    </div>
                    <button className="px-6 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-xl hover:shadow-lg transition mb-4">
                      Edit Profile
                    </button>
                  </div>

                  <div className="flex gap-8">
                    <div>
                      <div className="text-2xl font-bold">15</div>
                      <div className="text-sm text-muted-foreground">Projects</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold">4.9</div>
                      <div className="text-sm text-muted-foreground">Rating</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold">$8.5k</div>
                      <div className="text-sm text-muted-foreground">Earned</div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid lg:grid-cols-3 gap-6">
                {/* Left Column */}
                <div className="lg:col-span-2 space-y-6">
                  {/* About */}
                  <div className="bg-card border border-border rounded-2xl p-6">
                    <h2 className="text-xl font-bold mb-4">About</h2>
                    <p className="text-muted-foreground leading-relaxed">
                      Experienced full-stack developer specializing in React and Node.js. I've been building
                      web applications for 5+ years and love creating clean, efficient solutions. Passionate
                      about modern web technologies and always eager to take on new challenges.
                    </p>
                  </div>

                  {/* Skills */}
                  <div className="bg-card border border-border rounded-2xl p-6">
                    <h2 className="text-xl font-bold mb-4">Skills & Expertise</h2>
                    <div className="flex flex-wrap gap-2">
                      {[
                        "React",
                        "Node.js",
                        "TypeScript",
                        "MongoDB",
                        "PostgreSQL",
                        "Express.js",
                        "Next.js",
                        "Tailwind CSS",
                        "AWS",
                        "Docker",
                      ].map((skill, index) => (
                        <span
                          key={index}
                          className="px-4 py-2 bg-gradient-to-r from-green-100 to-emerald-100 dark:from-green-950/50 dark:to-emerald-950/50 text-green-700 dark:text-green-400 rounded-full text-sm font-medium"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Portfolio */}
                  <div className="bg-card border border-border rounded-2xl p-6">
                    <h2 className="text-xl font-bold mb-4">Completed Projects</h2>
                    <div className="space-y-4">
                      {[
                        {
                          name: "E-commerce Platform",
                          description: "Full-stack online store with payment integration",
                          completion: "Nov 2024",
                        },
                        {
                          name: "SaaS Dashboard",
                          description: "Analytics dashboard with real-time data visualization",
                          completion: "Oct 2024",
                        },
                        {
                          name: "Mobile App Backend",
                          description: "RESTful API with authentication and database",
                          completion: "Sep 2024",
                        },
                      ].map((project, index) => (
                        <div
                          key={index}
                          className="p-4 border border-border rounded-xl hover:border-primary hover:shadow-md transition cursor-pointer"
                        >
                          <div className="flex items-start justify-between mb-2">
                            <h3 className="font-semibold">{project.name}</h3>
                            <span className="text-xs px-3 py-1 bg-green-100 dark:bg-green-950/50 text-green-700 dark:text-green-400 rounded-full">
                              Completed
                            </span>
                          </div>
                          <p className="text-sm text-muted-foreground mb-2">{project.description}</p>
                          <p className="text-xs text-muted-foreground">{project.completion}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Right Column */}
                <div className="space-y-6">
                  {/* Stats */}
                  <div className="bg-card border border-border rounded-2xl p-6">
                    <h2 className="text-xl font-bold mb-4">Stats</h2>
                    <div className="space-y-4">
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm text-muted-foreground">Job Success</span>
                          <span className="text-sm font-semibold">100%</span>
                        </div>
                        <div className="w-full h-2 bg-accent rounded-full overflow-hidden">
                          <div className="h-full w-full bg-gradient-to-r from-green-600 to-emerald-600 rounded-full"></div>
                        </div>
                      </div>
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm text-muted-foreground">On-Time Delivery</span>
                          <span className="text-sm font-semibold">95%</span>
                        </div>
                        <div className="w-full h-2 bg-accent rounded-full overflow-hidden">
                          <div className="h-full w-[95%] bg-gradient-to-r from-green-600 to-emerald-600 rounded-full"></div>
                        </div>
                      </div>
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm text-muted-foreground">Response Rate</span>
                          <span className="text-sm font-semibold">100%</span>
                        </div>
                        <div className="w-full h-2 bg-accent rounded-full overflow-hidden">
                          <div className="h-full w-full bg-gradient-to-r from-green-600 to-emerald-600 rounded-full"></div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Contact Info */}
                  <div className="bg-card border border-border rounded-2xl p-6">
                    <h2 className="text-xl font-bold mb-4">Contact</h2>
                    <div className="space-y-3">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-accent flex items-center justify-center">
                          <Mail className="w-5 h-5 text-muted-foreground" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="text-xs text-muted-foreground">Email</div>
                          <div className="text-sm truncate">alex.t@email.com</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-accent flex items-center justify-center">
                          <Github className="w-5 h-5 text-muted-foreground" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="text-xs text-muted-foreground">GitHub</div>
                          <div className="text-sm truncate">@alexthompson</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    );
  };

  // Admin Sidebar Component
  const AdminSidebar = ({ activePage }: { activePage: string }) => (
    <aside className="w-64 bg-sidebar border-r border-sidebar-border flex flex-col">
      <div className="p-4 border-b border-sidebar-border">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-orange-600 to-red-600 flex items-center justify-center">
            <Shield className="w-6 h-6 text-white" />
          </div>
          <span className="text-lg font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
            Admin Panel
          </span>
        </div>
      </div>

      <nav className="flex-1 p-4 space-y-2 overflow-auto">
        {[
          { icon: <LayoutDashboard />, label: "Overview", page: "admin" },
          { icon: <Users />, label: "Users", page: "admin-users" },
          { icon: <FolderKanban />, label: "Projects", page: "admin-projects" },
          { icon: <Briefcase />, label: "Teams", page: "admin-teams" },
          { icon: <AlertCircle />, label: "Moderation", page: "admin-moderation" },
          { icon: <BarChart3 />, label: "Analytics", page: "admin-analytics" },
          { icon: <Settings />, label: "Settings", page: "admin-settings" },
          { icon: <UserCircle2 />, label: "Profile", page: "admin-profile" },
        ].map((item, index) => (
          <button
            key={index}
            onClick={() => setCurrentPage(item.page as any)}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition ${
              activePage === item.page
                ? "bg-gradient-to-r from-orange-600 to-red-600 text-white shadow-lg"
                : "text-sidebar-foreground hover:bg-sidebar-accent"
            }`}
          >
            <span className="flex-shrink-0">{item.icon}</span>
            <span className="text-sm font-medium">{item.label}</span>
          </button>
        ))}
      </nav>

      <div className="p-4 border-t border-sidebar-border space-y-2">
        <button
          onClick={() => {
            setIsAdmin(false);
            setCurrentPage("dashboard");
          }}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sidebar-foreground hover:bg-sidebar-accent transition"
        >
          <ArrowRight className="rotate-180" />
          <span className="text-sm font-medium">Exit Admin</span>
        </button>
        <button
          onClick={() => {
            setIsAdmin(false);
            setCurrentPage("landing");
          }}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-red-600 hover:bg-red-50 dark:hover:bg-red-950/20 transition"
        >
          <LogOut />
          <span className="text-sm font-medium">Logout</span>
        </button>
      </div>
    </aside>
  );

  // Admin Overview Dashboard
  const AdminOverviewPage = () => (
    <div className="min-h-screen bg-background flex">
      <AdminSidebar activePage="admin" />

      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="h-16 border-b border-border bg-card flex items-center justify-between px-6">
          <h1 className="text-xl font-bold">Admin Overview</h1>
          <div className="flex items-center gap-3">
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-lg hover:bg-accent transition"
            >
              {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
            <button className="relative p-2 rounded-lg hover:bg-accent transition">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 overflow-auto p-6">
          <div className="max-w-7xl mx-auto space-y-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  label: "Total Users",
                  value: adminUsers.length.toString(),
                  change: "+12%",
                  icon: <Users />,
                  color: "from-blue-600 to-cyan-600",
                },
                {
                  label: "Active Projects",
                  value: adminProjects.filter((p) => p.status === "Approved").length.toString(),
                  change: "+8%",
                  icon: <FolderKanban />,
                  color: "from-green-600 to-emerald-600",
                },
                {
                  label: "Pending Reports",
                  value: reports.filter((r) => r.status === "Pending").length.toString(),
                  change: "-5%",
                  icon: <AlertCircle />,
                  color: "from-orange-600 to-amber-600",
                },
                {
                  label: "Revenue",
                  value: "$12,450",
                  change: "+15%",
                  icon: <DollarSign />,
                  color: "from-purple-600 to-pink-600",
                },
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="group relative bg-card border border-border rounded-2xl p-6 hover:shadow-2xl transition-all duration-300 overflow-hidden"
                >
                  <div className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-0 group-hover:opacity-10 transition-opacity`}></div>
                  <div className="relative">
                    <div className="flex items-start justify-between mb-4">
                      <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center text-white shadow-lg`}>
                        {stat.icon}
                      </div>
                      <div className="text-xs px-2 py-1 bg-green-100 dark:bg-green-950/50 text-green-700 dark:text-green-400 rounded-full font-semibold">
                        {stat.change}
                      </div>
                    </div>
                    <div className="text-3xl font-bold mb-1">{stat.value}</div>
                    <div className="text-sm text-muted-foreground">{stat.label}</div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Recent Activity & Quick Actions */}
            <div className="grid lg:grid-cols-2 gap-6">
              {/* Recent Users */}
              <div className="bg-card border border-border rounded-2xl p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold">Recent Users</h2>
                  <button
                    onClick={() => setCurrentPage("admin-users")}
                    className="text-sm text-primary hover:underline flex items-center gap-1"
                  >
                    View all
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
                <div className="space-y-3">
                  {adminUsers.slice(0, 5).map((user) => (
                    <div key={user.id} className="flex items-center gap-3 p-3 bg-accent rounded-xl hover:bg-accent/70 transition cursor-pointer">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-600 to-purple-600 flex items-center justify-center text-white">
                        {user.avatar}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-semibold truncate">{user.name}</div>
                        <div className="text-xs text-muted-foreground">{user.email}</div>
                      </div>
                      <span
                        className={`text-xs px-3 py-1 rounded-full font-medium ${
                          user.status === "Active"
                            ? "bg-green-100 dark:bg-green-950/50 text-green-700 dark:text-green-400"
                            : "bg-red-100 dark:bg-red-950/50 text-red-700 dark:text-red-400"
                        }`}
                      >
                        {user.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Pending Approvals */}
              <div className="bg-card border border-border rounded-2xl p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold">Pending Approvals</h2>
                  <button
                    onClick={() => setCurrentPage("admin-projects")}
                    className="text-sm text-primary hover:underline flex items-center gap-1"
                  >
                    View all
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
                <div className="space-y-3">
                  {adminProjects
                    .filter((p) => p.status === "Pending")
                    .slice(0, 5)
                    .map((project) => (
                      <div key={project.id} className="p-3 bg-accent rounded-xl">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <div className="text-sm font-semibold">{project.name}</div>
                            <div className="text-xs text-muted-foreground">by {project.owner}</div>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleApproveProject(project.id)}
                            className="flex-1 px-3 py-1.5 bg-green-600 text-white rounded-lg text-sm hover:bg-green-700 transition"
                          >
                            Approve
                          </button>
                          <button
                            onClick={() => handleRejectProject(project.id)}
                            className="flex-1 px-3 py-1.5 bg-red-600 text-white rounded-lg text-sm hover:bg-red-700 transition"
                          >
                            Reject
                          </button>
                        </div>
                      </div>
                    ))}
                  {adminProjects.filter((p) => p.status === "Pending").length === 0 && (
                    <p className="text-center text-muted-foreground py-4">No pending approvals</p>
                  )}
                </div>
              </div>
            </div>

            {/* Platform Statistics */}
            <div className="bg-card border border-border rounded-2xl p-6">
              <h2 className="text-xl font-bold mb-6">Platform Statistics</h2>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="p-4 bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-950/30 dark:to-cyan-950/30 rounded-xl border border-blue-200 dark:border-blue-800">
                  <div className="flex items-center gap-3 mb-2">
                    <UserCheck className="w-5 h-5 text-blue-600" />
                    <span className="text-sm text-muted-foreground">Active Users</span>
                  </div>
                  <div className="text-2xl font-bold">{adminUsers.filter((u) => u.status === "Active").length}</div>
                </div>
                <div className="p-4 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950/30 dark:to-emerald-950/30 rounded-xl border border-green-200 dark:border-green-800">
                  <div className="flex items-center gap-3 mb-2">
                    <CheckCircle2 className="w-5 h-5 text-green-600" />
                    <span className="text-sm text-muted-foreground">Completed Projects</span>
                  </div>
                  <div className="text-2xl font-bold">{adminProjects.filter((p) => p.progress === 100).length}</div>
                </div>
                <div className="p-4 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-950/30 dark:to-pink-950/30 rounded-xl border border-purple-200 dark:border-purple-800">
                  <div className="flex items-center gap-3 mb-2">
                    <Briefcase className="w-5 h-5 text-purple-600" />
                    <span className="text-sm text-muted-foreground">Active Teams</span>
                  </div>
                  <div className="text-2xl font-bold">{teams.filter((t) => t.status === "Active").length}</div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );

  // Admin Users Management Page
  const AdminUsersPage = () => (
    <div className="min-h-screen bg-background flex">
      <AdminSidebar activePage="admin-users" />

      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="h-16 border-b border-border bg-card flex items-center justify-between px-6">
          <h1 className="text-xl font-bold">User Management</h1>
          <div className="flex items-center gap-3">
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-lg hover:bg-accent transition"
            >
              {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 overflow-auto p-6">
          <div className="max-w-7xl mx-auto space-y-6">
            {/* Search and Filters */}
            <div className="bg-card border border-border rounded-2xl p-4">
              <div className="flex flex-wrap gap-4">
                <div className="flex-1 min-w-[200px]">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <input
                      type="text"
                      placeholder="Search users by name or email..."
                      value={userSearchQuery}
                      onChange={(e) => setUserSearchQuery(e.target.value)}
                      className="w-full pl-9 pr-4 py-2 bg-accent rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                    />
                  </div>
                </div>
                <button className="px-4 py-2 bg-primary text-white rounded-lg hover:shadow-lg transition flex items-center gap-2">
                  <Filter className="w-4 h-4" />
                  Filters
                </button>
              </div>
            </div>

            {/* Users Table */}
            <div className="bg-card border border-border rounded-2xl overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-accent border-b border-border">
                    <tr>
                      <th className="px-6 py-4 text-left text-sm font-semibold">User</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold">Email</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold">Role</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold">Projects</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold">Status</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold">Joined</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    {filteredUsers.map((user) => (
                      <tr key={user.id} className="hover:bg-accent/50 transition">
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-600 to-purple-600 flex items-center justify-center text-white">
                              {user.avatar}
                            </div>
                            <span className="font-semibold">{user.name}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-sm text-muted-foreground">{user.email}</td>
                        <td className="px-6 py-4">
                          <span
                            className={`inline-flex px-3 py-1 rounded-full text-xs font-medium ${
                              user.role === "Admin"
                                ? "bg-orange-100 dark:bg-orange-950/50 text-orange-700 dark:text-orange-400"
                                : "bg-blue-100 dark:bg-blue-950/50 text-blue-700 dark:text-blue-400"
                            }`}
                          >
                            {user.role}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-sm">{user.projects}</td>
                        <td className="px-6 py-4">
                          <span
                            className={`inline-flex px-3 py-1 rounded-full text-xs font-medium ${
                              user.status === "Active"
                                ? "bg-green-100 dark:bg-green-950/50 text-green-700 dark:text-green-400"
                                : "bg-red-100 dark:bg-red-950/50 text-red-700 dark:text-red-400"
                            }`}
                          >
                            {user.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-sm text-muted-foreground">{user.joinedDate}</td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => handleSuspendUser(user.id)}
                              className={`p-2 rounded-lg transition ${
                                user.status === "Active"
                                  ? "hover:bg-red-100 dark:hover:bg-red-950/20 text-red-600"
                                  : "hover:bg-green-100 dark:hover:bg-green-950/20 text-green-600"
                              }`}
                              title={user.status === "Active" ? "Suspend" : "Activate"}
                            >
                              {user.status === "Active" ? <Ban className="w-4 h-4" /> : <Check className="w-4 h-4" />}
                            </button>
                            <button
                              onClick={() => handleDeleteUser(user.id)}
                              className="p-2 rounded-lg hover:bg-red-100 dark:hover:bg-red-950/20 text-red-600 transition"
                              title="Delete User"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                            <button
                              className="p-2 rounded-lg hover:bg-accent transition"
                              title="View Details"
                            >
                              <Eye className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );

  // Admin Projects Management Page
  const AdminProjectsPage = () => (
    <div className="min-h-screen bg-background flex">
      <AdminSidebar activePage="admin-projects" />

      <div className="flex-1 flex flex-col">
        <header className="h-16 border-b border-border bg-card flex items-center justify-between px-6">
          <h1 className="text-xl font-bold">Project Management</h1>
          <div className="flex items-center gap-3">
            <button onClick={toggleDarkMode} className="p-2 rounded-lg hover:bg-accent transition">
              {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
          </div>
        </header>

        <main className="flex-1 overflow-auto p-6">
          <div className="max-w-7xl mx-auto space-y-6">
            {/* Search and Filters */}
            <div className="bg-card border border-border rounded-2xl p-4">
              <div className="flex flex-wrap gap-4">
                <div className="flex-1 min-w-[200px]">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <input
                      type="text"
                      placeholder="Search projects..."
                      value={projectSearchQuery}
                      onChange={(e) => setProjectSearchQuery(e.target.value)}
                      className="w-full pl-9 pr-4 py-2 bg-accent rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                    />
                  </div>
                </div>
                <select className="px-4 py-2 bg-accent rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-ring">
                  <option>All Status</option>
                  <option>Pending</option>
                  <option>Approved</option>
                  <option>Rejected</option>
                  <option>Archived</option>
                </select>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {[
                { label: "Total Projects", value: adminProjects.length, color: "from-blue-600 to-cyan-600" },
                { label: "Pending", value: adminProjects.filter((p) => p.status === "Pending").length, color: "from-yellow-600 to-orange-600" },
                { label: "Approved", value: adminProjects.filter((p) => p.status === "Approved").length, color: "from-green-600 to-emerald-600" },
                { label: "Rejected", value: adminProjects.filter((p) => p.status === "Rejected").length, color: "from-red-600 to-pink-600" },
              ].map((stat, index) => (
                <div key={index} className="bg-card border border-border rounded-xl p-4">
                  <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${stat.color} flex items-center justify-center text-white mb-3`}>
                    <FolderKanban className="w-5 h-5" />
                  </div>
                  <div className="text-2xl font-bold">{stat.value}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </div>
              ))}
            </div>

            {/* Projects Table */}
            <div className="bg-card border border-border rounded-2xl overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-accent border-b border-border">
                    <tr>
                      <th className="px-6 py-4 text-left text-sm font-semibold">Project</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold">Owner</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold">Team</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold">Progress</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold">Status</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold">Created</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    {filteredProjects.map((project) => (
                      <tr key={project.id} className="hover:bg-accent/50 transition">
                        <td className="px-6 py-4">
                          <div className="font-semibold">{project.name}</div>
                          <div className="text-xs text-muted-foreground">{project.members} members</div>
                        </td>
                        <td className="px-6 py-4 text-sm">{project.owner}</td>
                        <td className="px-6 py-4 text-sm text-muted-foreground">{project.team}</td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2">
                            <div className="flex-1 h-2 bg-accent rounded-full overflow-hidden max-w-[100px]">
                              <div className="h-full bg-gradient-to-r from-indigo-600 to-purple-600" style={{ width: `${project.progress}%` }}></div>
                            </div>
                            <span className="text-sm font-medium">{project.progress}%</span>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span
                            className={`inline-flex px-3 py-1 rounded-full text-xs font-medium ${
                              project.status === "Approved"
                                ? "bg-green-100 dark:bg-green-950/50 text-green-700 dark:text-green-400"
                                : project.status === "Pending"
                                ? "bg-yellow-100 dark:bg-yellow-950/50 text-yellow-700 dark:text-yellow-400"
                                : project.status === "Rejected"
                                ? "bg-red-100 dark:bg-red-950/50 text-red-700 dark:text-red-400"
                                : "bg-gray-100 dark:bg-gray-950/50 text-gray-700 dark:text-gray-400"
                            }`}
                          >
                            {project.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-sm text-muted-foreground">{project.createdDate}</td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2">
                            {project.status === "Pending" && (
                              <>
                                <button
                                  onClick={() => handleApproveProject(project.id)}
                                  className="p-2 rounded-lg hover:bg-green-100 dark:hover:bg-green-950/20 text-green-600 transition"
                                  title="Approve"
                                >
                                  <Check className="w-4 h-4" />
                                </button>
                                <button
                                  onClick={() => handleRejectProject(project.id)}
                                  className="p-2 rounded-lg hover:bg-red-100 dark:hover:bg-red-950/20 text-red-600 transition"
                                  title="Reject"
                                >
                                  <XCircle className="w-4 h-4" />
                                </button>
                              </>
                            )}
                            <button
                              onClick={() => handleArchiveProject(project.id)}
                              className="p-2 rounded-lg hover:bg-accent transition"
                              title="Archive"
                            >
                              <Archive className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => handleDeleteProject(project.id)}
                              className="p-2 rounded-lg hover:bg-red-100 dark:hover:bg-red-950/20 text-red-600 transition"
                              title="Delete"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );

  // Admin Teams Management Page
  const AdminTeamsPage = () => (
    <div className="min-h-screen bg-background flex">
      <AdminSidebar activePage="admin-teams" />

      <div className="flex-1 flex flex-col">
        <header className="h-16 border-b border-border bg-card flex items-center justify-between px-6">
          <h1 className="text-xl font-bold">Team Management</h1>
          <div className="flex items-center gap-3">
            <button onClick={toggleDarkMode} className="p-2 rounded-lg hover:bg-accent transition">
              {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
          </div>
        </header>

        <main className="flex-1 overflow-auto p-6">
          <div className="max-w-7xl mx-auto space-y-6">
            {/* Search */}
            <div className="bg-card border border-border rounded-2xl p-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search teams..."
                  value={teamSearchQuery}
                  onChange={(e) => setTeamSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-4 py-2 bg-accent rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                />
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-card border border-border rounded-xl p-4">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-600 to-cyan-600 flex items-center justify-center text-white mb-3">
                  <Briefcase className="w-5 h-5" />
                </div>
                <div className="text-2xl font-bold">{teams.length}</div>
                <div className="text-sm text-muted-foreground">Total Teams</div>
              </div>
              <div className="bg-card border border-border rounded-xl p-4">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-green-600 to-emerald-600 flex items-center justify-center text-white mb-3">
                  <Users className="w-5 h-5" />
                </div>
                <div className="text-2xl font-bold">{teams.reduce((acc, team) => acc + team.members, 0)}</div>
                <div className="text-sm text-muted-foreground">Total Members</div>
              </div>
              <div className="bg-card border border-border rounded-xl p-4">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center text-white mb-3">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
                <div className="text-2xl font-bold">{teams.filter((t) => t.status === "Active").length}</div>
                <div className="text-sm text-muted-foreground">Active Teams</div>
              </div>
            </div>

            {/* Teams Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredTeams.map((team) => (
                <div key={team.id} className="bg-card border border-border rounded-2xl p-6 hover:shadow-lg transition">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-lg font-bold mb-1">{team.name}</h3>
                      <p className="text-sm text-muted-foreground">Led by {team.leader}</p>
                    </div>
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        team.status === "Active"
                          ? "bg-green-100 dark:bg-green-950/50 text-green-700 dark:text-green-400"
                          : "bg-gray-100 dark:bg-gray-950/50 text-gray-700 dark:text-gray-400"
                      }`}
                    >
                      {team.status}
                    </span>
                  </div>

                  <div className="space-y-3 mb-4">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Members</span>
                      <span className="font-semibold">{team.members}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Projects</span>
                      <span className="font-semibold">{team.projects}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Created</span>
                      <span className="font-semibold">{team.createdDate}</span>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <button className="flex-1 px-4 py-2 bg-primary text-white rounded-lg hover:shadow-lg transition text-sm">
                      View Details
                    </button>
                    <button className="px-4 py-2 border border-border rounded-lg hover:bg-accent transition">
                      <Settings className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  );

  // Admin Content Moderation Page
  const AdminModerationPage = () => (
    <div className="min-h-screen bg-background flex">
      <AdminSidebar activePage="admin-moderation" />

      <div className="flex-1 flex flex-col">
        <header className="h-16 border-b border-border bg-card flex items-center justify-between px-6">
          <h1 className="text-xl font-bold">Content Moderation</h1>
          <div className="flex items-center gap-3">
            <button onClick={toggleDarkMode} className="p-2 rounded-lg hover:bg-accent transition">
              {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
          </div>
        </header>

        <main className="flex-1 overflow-auto p-6">
          <div className="max-w-7xl mx-auto space-y-6">
            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {[
                { label: "Total Reports", value: reports.length, color: "from-blue-600 to-cyan-600" },
                { label: "Pending", value: reports.filter((r) => r.status === "Pending").length, color: "from-yellow-600 to-orange-600" },
                { label: "Resolved", value: reports.filter((r) => r.status === "Resolved").length, color: "from-green-600 to-emerald-600" },
                { label: "Dismissed", value: reports.filter((r) => r.status === "Dismissed").length, color: "from-gray-600 to-slate-600" },
              ].map((stat, index) => (
                <div key={index} className="bg-card border border-border rounded-xl p-4">
                  <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${stat.color} flex items-center justify-center text-white mb-3`}>
                    <AlertCircle className="w-5 h-5" />
                  </div>
                  <div className="text-2xl font-bold">{stat.value}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </div>
              ))}
            </div>

            {/* Reports List */}
            <div className="bg-card border border-border rounded-2xl p-6">
              <h2 className="text-lg font-bold mb-4">Recent Reports</h2>
              <div className="space-y-4">
                {reports.map((report) => (
                  <div
                    key={report.id}
                    className="p-4 border border-border rounded-xl hover:shadow-lg transition"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <span
                            className={`px-3 py-1 rounded-full text-xs font-medium ${
                              report.type === "User"
                                ? "bg-red-100 dark:bg-red-950/50 text-red-700 dark:text-red-400"
                                : report.type === "Project"
                                ? "bg-orange-100 dark:bg-orange-950/50 text-orange-700 dark:text-orange-400"
                                : "bg-yellow-100 dark:bg-yellow-950/50 text-yellow-700 dark:text-yellow-400"
                            }`}
                          >
                            {report.type}
                          </span>
                          <span
                            className={`px-3 py-1 rounded-full text-xs font-medium ${
                              report.status === "Pending"
                                ? "bg-yellow-100 dark:bg-yellow-950/50 text-yellow-700 dark:text-yellow-400"
                                : report.status === "Resolved"
                                ? "bg-green-100 dark:bg-green-950/50 text-green-700 dark:text-green-400"
                                : "bg-gray-100 dark:bg-gray-950/50 text-gray-700 dark:text-gray-400"
                            }`}
                          >
                            {report.status}
                          </span>
                        </div>
                        <div className="font-semibold mb-1">
                          Reported Item: <span className="text-primary">{report.reportedItem}</span>
                        </div>
                        <div className="text-sm text-muted-foreground mb-2">
                          Reported by: {report.reportedBy} • {report.date}
                        </div>
                        <div className="text-sm bg-accent p-3 rounded-lg">{report.reason}</div>
                      </div>
                    </div>
                    {report.status === "Pending" && (
                      <div className="flex gap-2 mt-3">
                        <button
                          onClick={() => handleResolveReport(report.id)}
                          className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
                        >
                          Resolve
                        </button>
                        <button
                          onClick={() => handleDismissReport(report.id)}
                          className="flex-1 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition"
                        >
                          Dismiss
                        </button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );

  // Admin Analytics Dashboard Page
  const AdminAnalyticsPage = () => (
    <div className="min-h-screen bg-background flex">
      <AdminSidebar activePage="admin-analytics" />

      <div className="flex-1 flex flex-col">
        <header className="h-16 border-b border-border bg-card flex items-center justify-between px-6">
          <h1 className="text-xl font-bold">Analytics Dashboard</h1>
          <div className="flex items-center gap-3">
            <button onClick={toggleDarkMode} className="p-2 rounded-lg hover:bg-accent transition">
              {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
            <button className="px-4 py-2 border border-border rounded-lg hover:bg-accent transition flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              <span className="text-sm">Last 30 days</span>
            </button>
          </div>
        </header>

        <main className="flex-1 overflow-auto p-6">
          <div className="max-w-7xl mx-auto space-y-6">
            {/* Key Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { label: "User Growth", value: "+24%", icon: <TrendingUp />, color: "from-blue-600 to-cyan-600" },
                { label: "Project Completion", value: "87%", icon: <CheckCircle2 />, color: "from-green-600 to-emerald-600" },
                { label: "Team Collaboration", value: "+15%", icon: <Users />, color: "from-purple-600 to-pink-600" },
                { label: "Platform Usage", value: "92%", icon: <Activity />, color: "from-orange-600 to-amber-600" },
              ].map((metric, index) => (
                <div key={index} className="bg-card border border-border rounded-2xl p-6">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${metric.color} flex items-center justify-center text-white mb-4`}>
                    {metric.icon}
                  </div>
                  <div className="text-3xl font-bold mb-1">{metric.value}</div>
                  <div className="text-sm text-muted-foreground">{metric.label}</div>
                </div>
              ))}
            </div>

            {/* Charts Section */}
            <div className="grid lg:grid-cols-2 gap-6">
              {/* User Growth Chart */}
              <div className="bg-card border border-border rounded-2xl p-6">
                <h2 className="text-lg font-bold mb-6 flex items-center gap-2">
                  <LineChart className="w-5 h-5 text-primary" />
                  User Growth Trend
                </h2>
                <div className="h-64 flex items-end justify-around gap-2">
                  {[65, 78, 82, 90, 88, 95, 100].map((height, i) => (
                    <div key={i} className="flex-1 flex flex-col items-center gap-2">
                      <div
                        className="w-full bg-gradient-to-t from-indigo-600 to-purple-600 rounded-t-lg transition-all hover:opacity-80"
                        style={{ height: `${height}%` }}
                      ></div>
                      <span className="text-xs text-muted-foreground">W{i + 1}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Project Completion Chart */}
              <div className="bg-card border border-border rounded-2xl p-6">
                <h2 className="text-lg font-bold mb-6 flex items-center gap-2">
                  <PieChart className="w-5 h-5 text-primary" />
                  Project Status Distribution
                </h2>
                <div className="flex items-center justify-center h-64">
                  <div className="relative w-48 h-48">
                    <div className="absolute inset-0 rounded-full bg-gradient-to-br from-green-600 to-emerald-600" style={{ clipPath: "polygon(50% 50%, 50% 0%, 100% 0%, 100% 100%, 50% 100%)" }}></div>
                    <div className="absolute inset-0 rounded-full bg-gradient-to-br from-yellow-600 to-orange-600" style={{ clipPath: "polygon(50% 50%, 100% 50%, 100% 100%, 50% 100%)" }}></div>
                    <div className="absolute inset-0 rounded-full bg-gradient-to-br from-red-600 to-pink-600" style={{ clipPath: "polygon(50% 50%, 50% 100%, 0% 100%, 0% 50%)" }}></div>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="bg-card rounded-full w-32 h-32 flex items-center justify-center">
                        <div className="text-center">
                          <div className="text-2xl font-bold">{adminProjects.length}</div>
                          <div className="text-xs text-muted-foreground">Projects</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-4 mt-6">
                  <div className="text-center">
                    <div className="w-3 h-3 rounded-full bg-green-600 mx-auto mb-1"></div>
                    <div className="text-sm font-semibold">Approved</div>
                    <div className="text-xs text-muted-foreground">{adminProjects.filter((p) => p.status === "Approved").length}</div>
                  </div>
                  <div className="text-center">
                    <div className="w-3 h-3 rounded-full bg-yellow-600 mx-auto mb-1"></div>
                    <div className="text-sm font-semibold">Pending</div>
                    <div className="text-xs text-muted-foreground">{adminProjects.filter((p) => p.status === "Pending").length}</div>
                  </div>
                  <div className="text-center">
                    <div className="w-3 h-3 rounded-full bg-red-600 mx-auto mb-1"></div>
                    <div className="text-sm font-semibold">Rejected</div>
                    <div className="text-xs text-muted-foreground">{adminProjects.filter((p) => p.status === "Rejected").length}</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Activity Stats */}
            <div className="bg-card border border-border rounded-2xl p-6">
              <h2 className="text-lg font-bold mb-6">Platform Activity</h2>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="p-4 bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-950/30 dark:to-cyan-950/30 rounded-xl border border-blue-200 dark:border-blue-800">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-muted-foreground">Daily Active Users</span>
                    <TrendingUp className="w-4 h-4 text-blue-600" />
                  </div>
                  <div className="text-2xl font-bold">2,547</div>
                  <div className="text-xs text-green-600 mt-1">+12% from last week</div>
                </div>
                <div className="p-4 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-950/30 dark:to-pink-950/30 rounded-xl border border-purple-200 dark:border-purple-800">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-muted-foreground">Projects Created</span>
                    <FolderKanban className="w-4 h-4 text-purple-600" />
                  </div>
                  <div className="text-2xl font-bold">189</div>
                  <div className="text-xs text-green-600 mt-1">+8% from last week</div>
                </div>
                <div className="p-4 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950/30 dark:to-emerald-950/30 rounded-xl border border-green-200 dark:border-green-800">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-muted-foreground">Avg. Completion Time</span>
                    <Clock className="w-4 h-4 text-green-600" />
                  </div>
                  <div className="text-2xl font-bold">4.5d</div>
                  <div className="text-xs text-green-600 mt-1">-15% faster</div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );

  // Admin Settings Page
  const AdminSettingsPage = () => (
    <div className="min-h-screen bg-background flex">
      <AdminSidebar activePage="admin-settings" />

      <div className="flex-1 flex flex-col">
        <header className="h-16 border-b border-border bg-card flex items-center justify-between px-6">
          <h1 className="text-xl font-bold">System Settings</h1>
          <div className="flex items-center gap-3">
            <button onClick={toggleDarkMode} className="p-2 rounded-lg hover:bg-accent transition">
              {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
          </div>
        </header>

        <main className="flex-1 overflow-auto p-6">
          <div className="max-w-4xl mx-auto space-y-6">
            {/* Platform Configuration */}
            <div className="bg-card border border-border rounded-2xl p-6">
              <h2 className="text-lg font-bold mb-6 flex items-center gap-2">
                <Settings className="w-5 h-5 text-primary" />
                Platform Configuration
              </h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Platform Name</label>
                  <input
                    type="text"
                    defaultValue="ProjectSphere"
                    className="w-full px-4 py-3 bg-input-background border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-ring"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Support Email</label>
                  <input
                    type="email"
                    defaultValue="support@projectsphere.com"
                    className="w-full px-4 py-3 bg-input-background border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-ring"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Maintenance Mode</label>
                  <div className="flex items-center gap-3">
                    <button className="flex-1 px-4 py-3 border-2 border-primary bg-primary/10 text-primary rounded-xl font-semibold">
                      Disabled
                    </button>
                    <button className="flex-1 px-4 py-3 border border-border rounded-xl hover:bg-accent transition">
                      Enabled
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Email Notifications */}
            <div className="bg-card border border-border rounded-2xl p-6">
              <h2 className="text-lg font-bold mb-6 flex items-center gap-2">
                <Mail className="w-5 h-5 text-primary" />
                Email Notifications
              </h2>
              <div className="space-y-3">
                {[
                  { label: "New User Registration", enabled: true },
                  { label: "Project Submission", enabled: true },
                  { label: "Payment Received", enabled: true },
                  { label: "System Alerts", enabled: false },
                  { label: "Weekly Reports", enabled: true },
                ].map((item, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-accent rounded-lg">
                    <span className="text-sm font-medium">{item.label}</span>
                    <button
                      className={`w-12 h-6 rounded-full transition ${
                        item.enabled ? "bg-green-600" : "bg-gray-300 dark:bg-gray-600"
                      }`}
                    >
                      <div
                        className={`w-5 h-5 bg-white rounded-full shadow transition transform ${
                          item.enabled ? "translate-x-6" : "translate-x-0.5"
                        }`}
                      ></div>
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Security Settings */}
            <div className="bg-card border border-border rounded-2xl p-6">
              <h2 className="text-lg font-bold mb-6 flex items-center gap-2">
                <Key className="w-5 h-5 text-primary" />
                Security Settings
              </h2>
              <div className="space-y-3">
                {[
                  { label: "Two-Factor Authentication", enabled: true },
                  { label: "Session Timeout (30 min)", enabled: true },
                  { label: "IP Whitelist", enabled: false },
                  { label: "Password Policy (Strong)", enabled: true },
                ].map((item, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-accent rounded-lg">
                    <span className="text-sm font-medium">{item.label}</span>
                    <button
                      className={`w-12 h-6 rounded-full transition ${
                        item.enabled ? "bg-green-600" : "bg-gray-300 dark:bg-gray-600"
                      }`}
                    >
                      <div
                        className={`w-5 h-5 bg-white rounded-full shadow transition transform ${
                          item.enabled ? "translate-x-6" : "translate-x-0.5"
                        }`}
                      ></div>
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Backup & Restore */}
            <div className="bg-card border border-border rounded-2xl p-6">
              <h2 className="text-lg font-bold mb-6 flex items-center gap-2">
                <Database className="w-5 h-5 text-primary" />
                Backup & Restore
              </h2>
              <div className="space-y-4">
                <div className="p-4 bg-accent rounded-xl">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium">Last Backup</span>
                    <span className="text-sm text-green-600">2 hours ago</span>
                  </div>
                  <div className="text-xs text-muted-foreground">Next scheduled backup: Today at 11:00 PM</div>
                </div>
                <div className="flex gap-3">
                  <button className="flex-1 px-4 py-3 bg-primary text-white rounded-xl hover:shadow-lg transition flex items-center justify-center gap-2">
                    <RefreshCw className="w-4 h-4" />
                    Backup Now
                  </button>
                  <button className="flex-1 px-4 py-3 border border-border rounded-xl hover:bg-accent transition flex items-center justify-center gap-2">
                    <Upload className="w-4 h-4" />
                    Restore
                  </button>
                </div>
              </div>
            </div>

            {/* Save Button */}
            <div className="flex justify-end gap-3">
              <button className="px-6 py-3 border border-border rounded-xl hover:bg-accent transition">
                Cancel
              </button>
              <button className="px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl font-semibold hover:shadow-lg transition">
                Save Changes
              </button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );

  // Admin Profile Page
  const AdminProfilePage = () => (
    <div className="min-h-screen bg-background flex">
      <AdminSidebar activePage="admin-profile" />

      <div className="flex-1 flex flex-col">
        <header className="h-16 border-b border-border bg-card flex items-center justify-between px-6">
          <h1 className="text-xl font-bold">Admin Profile</h1>
          <div className="flex items-center gap-3">
            <button onClick={toggleDarkMode} className="p-2 rounded-lg hover:bg-accent transition">
              {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
          </div>
        </header>

        <main className="flex-1 overflow-auto p-6">
          <div className="max-w-4xl mx-auto space-y-6">
            {/* Profile Header */}
            <div className="bg-card border border-border rounded-2xl overflow-hidden">
              <div className="h-32 bg-gradient-to-r from-orange-600 to-red-600"></div>
              <div className="px-8 pb-8">
                <div className="flex items-end gap-6 -mt-16 mb-6">
                  <div className="w-32 h-32 rounded-2xl bg-gradient-to-br from-orange-600 to-red-600 border-4 border-card flex items-center justify-center text-white text-5xl shadow-xl">
                    👨‍💼
                  </div>
                  <div className="flex-1 pb-4">
                    <h1 className="text-3xl font-bold mb-2">Admin User</h1>
                    <p className="text-muted-foreground">System Administrator</p>
                  </div>
                  <button className="px-6 py-3 bg-gradient-to-r from-orange-600 to-red-600 text-white rounded-xl font-semibold hover:shadow-lg transition mb-4">
                    Edit Profile
                  </button>
                </div>
              </div>
            </div>

            {/* Account Settings */}
            <div className="bg-card border border-border rounded-2xl p-6">
              <h2 className="text-lg font-bold mb-6">Account Settings</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Full Name</label>
                  <input
                    type="text"
                    defaultValue="Admin User"
                    className="w-full px-4 py-3 bg-input-background border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-ring"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Email</label>
                  <input
                    type="email"
                    defaultValue="admin@projectsphere.com"
                    className="w-full px-4 py-3 bg-input-background border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-ring"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Phone</label>
                  <input
                    type="tel"
                    defaultValue="+1 (555) 123-4567"
                    className="w-full px-4 py-3 bg-input-background border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-ring"
                  />
                </div>
              </div>
            </div>

            {/* Security Preferences */}
            <div className="bg-card border border-border rounded-2xl p-6">
              <h2 className="text-lg font-bold mb-6">Security Preferences</h2>
              <div className="space-y-4">
                <button className="w-full px-4 py-3 border border-border rounded-xl hover:bg-accent transition text-left flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Key className="w-5 h-5 text-muted-foreground" />
                    <div>
                      <div className="font-semibold">Change Password</div>
                      <div className="text-xs text-muted-foreground">Last changed 30 days ago</div>
                    </div>
                  </div>
                  <ChevronRight className="w-5 h-5 text-muted-foreground" />
                </button>
                <button className="w-full px-4 py-3 border border-border rounded-xl hover:bg-accent transition text-left flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Shield className="w-5 h-5 text-muted-foreground" />
                    <div>
                      <div className="font-semibold">Two-Factor Authentication</div>
                      <div className="text-xs text-green-600">Enabled</div>
                    </div>
                  </div>
                  <ChevronRight className="w-5 h-5 text-muted-foreground" />
                </button>
              </div>
            </div>

            {/* Activity Log */}
            <div className="bg-card border border-border rounded-2xl p-6">
              <h2 className="text-lg font-bold mb-6">Recent Activity</h2>
              <div className="space-y-3">
                {[
                  { action: "Approved project: Mobile App Design", time: "2 hours ago", icon: <CheckCircle2 className="w-4 h-4" /> },
                  { action: "Suspended user: John Doe", time: "5 hours ago", icon: <Ban className="w-4 h-4" /> },
                  { action: "Updated system settings", time: "1 day ago", icon: <Settings className="w-4 h-4" /> },
                  { action: "Resolved report #123", time: "2 days ago", icon: <AlertCircle className="w-4 h-4" /> },
                ].map((activity, index) => (
                  <div key={index} className="flex items-center gap-3 p-3 bg-accent rounded-lg">
                    <div className="w-8 h-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center flex-shrink-0">
                      {activity.icon}
                    </div>
                    <div className="flex-1">
                      <div className="text-sm font-medium">{activity.action}</div>
                      <div className="text-xs text-muted-foreground">{activity.time}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );

  // Render current page
  const renderPage = () => {
    switch (currentPage) {
      case "landing":
        return <LandingPage />;
      case "login":
        return <LoginPage />;
      case "signup":
        return <SignupPage />;
      case "dashboard":
        return <DashboardPage />;
      case "post-project":
        return <PostProjectPage />;
      case "my-projects":
        return <MyProjectsPage />;
      case "active-projects":
        return <ActiveProjectsPage />;
      case "completed-projects":
        return <CompletedProjectsPage />;
      case "pending-projects":
        return <PendingProjectsPage />;
      case "browse-makers":
        return <BrowseMakersPage />;
      case "customer-messages":
        return <CustomerMessagesPage />;
      case "customer-payments":
        return <CustomerPaymentsPage />;
      case "customer-reviews":
        return <CustomerReviewsPage />;
      case "customer-settings":
        return <CustomerSettingsPage />;
      case "project":
        return <ProjectPage />;
      case "team":
        return <TeamPage />;
      case "profile":
        return <ProfilePage />;
      case "maker-dashboard":
        return <MakerDashboardPage />;
      case "available-projects":
        return <AvailableProjectsPage />;
      case "my-bids":
        return <MyBidsPage />;
      case "active-work":
        return <ActiveWorkPage />;
      case "earnings":
        return <EarningsPage />;
      case "maker-messages":
        return <MakerMessagesPage />;
      case "maker-reviews":
        return <MakerReviewsPage />;
      case "maker-settings":
        return <MakerSettingsPage />;
      case "maker-profile":
        return <MakerProfilePage />;
      case "admin":
        return <AdminOverviewPage />;
      case "admin-users":
        return <AdminUsersPage />;
      case "admin-projects":
        return <AdminProjectsPage />;
      case "admin-teams":
        return <AdminTeamsPage />;
      case "admin-moderation":
        return <AdminModerationPage />;
      case "admin-analytics":
        return <AdminAnalyticsPage />;
      case "admin-settings":
        return <AdminSettingsPage />;
      case "admin-profile":
        return <AdminProfilePage />;
      default:
        return <LandingPage />;
    }
  };

  return (
    <div className="antialiased">
      {renderPage()}

      {/* Toast Notifications */}
      <div className="fixed top-4 right-4 z-50 space-y-2">
        <AnimatePresence>
          {toasts.map((toast) => (
            <motion.div
              key={toast.id}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 100 }}
              className={`px-4 py-3 rounded-xl shadow-lg flex items-center gap-3 min-w-[300px] ${
                toast.type === "success"
                  ? "bg-green-600 text-white"
                  : toast.type === "error"
                  ? "bg-red-600 text-white"
                  : "bg-blue-600 text-white"
              }`}
            >
              {toast.type === "success" && <CheckCircle2 className="w-5 h-5" />}
              {toast.type === "error" && <XCircle className="w-5 h-5" />}
              {toast.type === "info" && <AlertCircle className="w-5 h-5" />}
              <span className="font-medium">{toast.message}</span>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Bid Modal */}
      <AnimatePresence>
        {showBidModal && selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setShowBidModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-card border border-border rounded-2xl p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-start justify-between mb-6">
                <div>
                  <h2 className="text-2xl font-bold mb-2">Submit Your Bid</h2>
                  <p className="text-muted-foreground">{selectedProject.title}</p>
                </div>
                <button
                  onClick={() => setShowBidModal(false)}
                  className="p-2 hover:bg-accent rounded-lg transition"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  const formData = new FormData(e.currentTarget);
                  const amount = formData.get("amount") as string;
                  const proposal = formData.get("proposal") as string;

                  if (amount && proposal) {
                    submitBid(selectedProject.id, `$${amount}`, proposal);
                    setShowBidModal(false);
                    setSelectedProject(null);
                  }
                }}
                className="space-y-6"
              >
                <div>
                  <label className="block text-sm font-medium mb-2">Your Bid Amount (USD) *</label>
                  <input
                    type="number"
                    name="amount"
                    required
                    placeholder="Enter your bid amount"
                    className="w-full px-4 py-3 bg-input-background border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-ring"
                  />
                  <p className="text-sm text-muted-foreground mt-1">
                    Project budget: {selectedProject.budget}
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Proposal *</label>
                  <textarea
                    name="proposal"
                    required
                    rows={8}
                    placeholder="Explain why you're the best fit for this project..."
                    className="w-full px-4 py-3 bg-input-background border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-ring resize-none"
                  />
                </div>

                <div className="flex gap-4">
                  <button
                    type="button"
                    onClick={() => setShowBidModal(false)}
                    className="flex-1 px-6 py-3 border border-border rounded-xl font-semibold hover:bg-accent transition"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 px-6 py-3 bg-gradient-to-r from-emerald-600 to-green-600 text-white rounded-xl font-semibold hover:shadow-lg transition"
                  >
                    Submit Bid
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Review Modal */}
      <AnimatePresence>
        {showReviewModal && selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setShowReviewModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-card border border-border rounded-2xl p-6 max-w-2xl w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-start justify-between mb-6">
                <div>
                  <h2 className="text-2xl font-bold mb-2">Leave a Review</h2>
                  <p className="text-muted-foreground">{selectedProject.title}</p>
                </div>
                <button
                  onClick={() => setShowReviewModal(false)}
                  className="p-2 hover:bg-accent rounded-lg transition"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  const formData = new FormData(e.currentTarget);
                  const rating = parseInt(formData.get("rating") as string);
                  const comment = formData.get("comment") as string;

                  if (rating && comment && selectedProject.makerId && selectedProject.makerName) {
                    submitReview(
                      selectedProject.id,
                      selectedProject.makerId,
                      selectedProject.makerName,
                      rating,
                      comment
                    );
                    setShowReviewModal(false);
                    setSelectedProject(null);
                  }
                }}
                className="space-y-6"
              >
                <div>
                  <label className="block text-sm font-medium mb-3">Rating *</label>
                  <div className="flex gap-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <label key={star} className="cursor-pointer">
                        <input
                          type="radio"
                          name="rating"
                          value={star}
                          required
                          className="sr-only peer"
                        />
                        <Star className="w-8 h-8 text-gray-300 peer-checked:text-yellow-500 peer-checked:fill-yellow-500 hover:text-yellow-400 transition" />
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Your Review *</label>
                  <textarea
                    name="comment"
                    required
                    rows={6}
                    placeholder="Share your experience working with this maker..."
                    className="w-full px-4 py-3 bg-input-background border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-ring resize-none"
                  />
                </div>

                <div className="flex gap-4">
                  <button
                    type="button"
                    onClick={() => setShowReviewModal(false)}
                    className="flex-1 px-6 py-3 border border-border rounded-xl font-semibold hover:bg-accent transition"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl font-semibold hover:shadow-lg transition"
                  >
                    Submit Review
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// Task Card Component for Kanban Board
function TaskCard({
  title,
  priority,
  assignees,
  comments,
  attachments,
  completed = false,
}: {
  title: string;
  priority: string;
  assignees: string[];
  comments: number;
  attachments: number;
  completed?: boolean;
}) {
  const priorityColors = {
    High: "bg-red-100 text-red-700 dark:bg-red-950/50 dark:text-red-400",
    Medium: "bg-yellow-100 text-yellow-700 dark:bg-yellow-950/50 dark:text-yellow-400",
    Low: "bg-green-100 text-green-700 dark:bg-green-950/50 dark:text-green-400",
  };

  return (
    <div className="bg-white dark:bg-slate-800 border border-border rounded-xl p-4 hover:shadow-lg transition-all cursor-pointer group">
      <div className="flex items-start justify-between mb-3">
        <h4 className={`font-semibold text-sm ${completed ? "line-through text-muted-foreground" : ""}`}>
          {title}
        </h4>
        <button className="opacity-0 group-hover:opacity-100 transition">
          <MoreVertical className="w-4 h-4" />
        </button>
      </div>

      <div className="flex items-center gap-2 mb-3">
        <span
          className={`text-xs px-2 py-1 rounded-full ${
            priorityColors[priority as keyof typeof priorityColors]
          }`}
        >
          {priority}
        </span>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex -space-x-2">
          {assignees.map((assignee, index) => (
            <div
              key={index}
              className="w-6 h-6 rounded-full bg-gradient-to-br from-indigo-600 to-purple-600 border-2 border-white dark:border-slate-800 flex items-center justify-center text-xs"
            >
              {assignee}
            </div>
          ))}
        </div>

        <div className="flex items-center gap-3 text-muted-foreground">
          {comments > 0 && (
            <div className="flex items-center gap-1 text-xs">
              <MessageSquare className="w-3 h-3" />
              {comments}
            </div>
          )}
          {attachments > 0 && (
            <div className="flex items-center gap-1 text-xs">
              <Paperclip className="w-3 h-3" />
              {attachments}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
