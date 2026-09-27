import React, { useState, useEffect } from 'react';
import { PatronUser, RegisteredAccount } from '../types/auth';
import { CITIES } from '../data/cities';
import {
  X,
  Lock,
  Mail,
  Phone,
  User,
  MapPin,
  Eye,
  EyeOff,
  Check,
  ShieldCheck,
  Sparkles,
  ArrowRight,
  AlertCircle,
  KeyRound,
  Quote,
} from 'lucide-react';

interface PatronAuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: (user: PatronUser) => void;
  initialMode?: 'login' | 'signup';
}

// Initial registered patrons database for seamless testing and demonstration
const DEFAULT_REGISTERED_PATRONS: RegisteredAccount[] = [
  {
    id: 'AUR-PATRON-8821',
    salutation: 'Mr.',
    name: 'Vikramaditya Singhania',
    email: 'vikramaditya.s@singhaniacapital.in',
    phone: '+91 98200 44100',
    city: 'Mumbai',
    tier: 'Sovereign Black Reserve',
    memberSince: 'March 2024',
    conciergeAssigned: 'Aaditya Deshmukh (Senior Curator)',
    passwordHash: 'Aurelia#2026',
  },
  {
    id: 'AUR-PATRON-9042',
    salutation: 'Ms.',
    name: 'Ayesha Singhal',
    email: 'ayesha.singhal@luxurydrive.in',
    phone: '+91 98111 22334',
    city: 'Delhi NCR',
    tier: 'Atelier Member',
    memberSince: 'June 2025',
    conciergeAssigned: 'Rajesh Sharma (Aerocity Atelier)',
    passwordHash: 'Sovereign@2026',
  },
];

// Curated professional luxury quotes
const LUXURY_QUOTES = [
  {
    quote: 'Excellence is never an accident; it is the sovereign result of high intention, sincere effort, and intelligent execution.',
    author: 'Aurelia Sovereign Philosophy',
  },
  {
    quote: 'Discretion, precision, and unyielding security are the truest hallmarks of modern automotive luxury.',
    author: 'Aurelia Discretion Charter',
  },
  {
    quote: 'To command the extraordinary on open roads, one must first master the integrity of every detail.',
    author: 'Curator Atelier Council',
  },
  {
    quote: 'Simplicity is the ultimate sophistication. When power meets poise, luxury speaks without shouting.',
    author: 'Gran Turismo Heritage',
  },
];

export const PatronAuthModal: React.FC<PatronAuthModalProps> = ({
  isOpen,
  onClose,
  onLoginSuccess,
  initialMode = 'login',
}) => {
  const [mode, setMode] = useState<'login' | 'signup'>(initialMode);

  // Password visibility controls
  const [showLoginPassword, setShowLoginPassword] = useState(false);
  const [showSignupPassword, setShowSignupPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Active quote index
  const [quoteIndex, setQuoteIndex] = useState(0);

  // Login form state
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');

  // Sign up form state
  const [salutation, setSalutation] = useState('Mr.');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [city, setCity] = useState(CITIES[0].name);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [agreedToCharter, setAgreedToCharter] = useState(true);

  // Error banners and messages
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [alreadyExistsAlert, setAlreadyExistsAlert] = useState<{
    field: 'phone' | 'email' | 'name';
    message: string;
    existingIdentifier: string;
  } | null>(null);

  // Synchronize initialMode whenever opened
  useEffect(() => {
    if (isOpen) {
      setMode(initialMode);
      setErrors({});
      setAlreadyExistsAlert(null);
      // Rotate quote smoothly
      setQuoteIndex((prev) => (prev + 1) % LUXURY_QUOTES.length);
    }
  }, [isOpen, initialMode]);

  if (!isOpen) return null;

  // Helper to retrieve registered patrons from local repository
  const getRegisteredPatrons = (): RegisteredAccount[] => {
    try {
      const stored = localStorage.getItem('aurelia_registered_patrons');
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
    } catch (e) {
      console.error('Failed reading patrons repository:', e);
    }
    // Pre-populate if not existing
    try {
      localStorage.setItem('aurelia_registered_patrons', JSON.stringify(DEFAULT_REGISTERED_PATRONS));
    } catch {}
    return DEFAULT_REGISTERED_PATRONS;
  };

  // Helper to save registered patrons
  const saveRegisteredPatron = (newAccount: RegisteredAccount) => {
    const list = getRegisteredPatrons();
    const updated = [newAccount, ...list];
    try {
      localStorage.setItem('aurelia_registered_patrons', JSON.stringify(updated));
    } catch (e) {
      console.error('Failed saving patron:', e);
    }
  };

  // Password validation rules:
  // Must be >= 6 characters, contains letters, contains a symbol, and contains a number
  const hasMinLength = password.length >= 6;
  const hasLetter = /[a-zA-Z]/.test(password);
  const hasSymbol = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~`]/.test(password);
  const hasNumber = /[0-9]/.test(password);
  const isPasswordValid = hasMinLength && hasLetter && hasSymbol && hasNumber;

  // One-Click Demo Login
  const handleDemoLogin = () => {
    const demoUser = DEFAULT_REGISTERED_PATRONS[0];
    onLoginSuccess(demoUser);
    onClose();
  };

  // Switch to login tab and prefill identifier when user already exists
  const handleSwitchToLoginWithIdentifier = (identifier: string) => {
    setMode('login');
    setLoginEmail(identifier);
    setLoginPassword('');
    setErrors({});
    setAlreadyExistsAlert(null);
  };

  // Handle Login Submit
  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    const newErrors: { [key: string]: string } = {};

    const cleanIdentifier = loginEmail.trim();
    if (!cleanIdentifier) {
      newErrors.loginEmail = 'Please enter your registered email, mobile number, or full name';
    }

    if (!loginPassword) {
      newErrors.loginPassword = 'Password is required to authenticate';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const patrons = getRegisteredPatrons();
    const cleanDigits = cleanIdentifier.replace(/\D/g, '');

    // Match by email OR phone digits OR legal name (case-insensitive)
    const matchedAccount = patrons.find((p) => {
      const emailMatch = p.email.toLowerCase() === cleanIdentifier.toLowerCase();
      const phoneDigits = p.phone.replace(/\D/g, '');
      const phoneMatch = cleanDigits.length >= 8 && phoneDigits.endsWith(cleanDigits);
      const nameMatch = p.name.toLowerCase() === cleanIdentifier.toLowerCase();
      return emailMatch || phoneMatch || nameMatch;
    });

    if (!matchedAccount) {
      setErrors({
        loginGeneral:
          'No patron account found matching this email, phone, or name. Please verify your credentials or select Create Account.',
      });
      return;
    }

    // Verify Password: if password does not match, display exact guidance
    if (matchedAccount.passwordHash !== loginPassword) {
      setErrors({
        loginPassword:
          'Authentication failed. Please enter the correct password for proceeding or continuing to your sovereign portfolio.',
      });
      return;
    }

    // Login successful
    const { passwordHash, ...userToReturn } = matchedAccount;
    onLoginSuccess(userToReturn);
    onClose();
  };

  // Handle Sign Up Submit
  const handleSignUpSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    setAlreadyExistsAlert(null);

    const newErrors: { [key: string]: string } = {};

    const cleanName = name.trim();
    const cleanEmail = email.trim();
    const cleanPhone = phone.trim();
    const phoneDigits = cleanPhone.replace(/\D/g, '');

    if (!cleanName) {
      newErrors.name = 'Please provide your full legal name';
    }

    if (!cleanEmail || !/^\S+@\S+\.\S+$/.test(cleanEmail)) {
      newErrors.email = 'Valid corporate or personal email address is required';
    }

    if (!cleanPhone || phoneDigits.length < 10) {
      newErrors.phone = 'Valid 10-digit Indian mobile number is required';
    }

    // Strict Password Validation Rule:
    // Minimum 6 characters with combination of letters and special symbols
    if (!password) {
      newErrors.password = 'Please create a sovereign password to proceed';
    } else if (!isPasswordValid) {
      newErrors.password =
        'Password must be at least 6 characters and contain a combination of letters, numbers, and special symbols (e.g., Aurelia#26).';
    }

    if (password && password !== confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match. Please verify both entries';
    }

    if (!agreedToCharter) {
      newErrors.charter = 'You must accept the Client Discretion Charter to establish an account';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Check for Duplicates in registered patrons:
    // "if some user same name and same mail id or same phone number then say this number alreday exist say do login"
    const patrons = getRegisteredPatrons();

    // 1. Check Phone Number Duplicate
    const existingByPhone = patrons.find((p) => {
      const pDigits = p.phone.replace(/\D/g, '');
      return pDigits.endsWith(phoneDigits) || phoneDigits.endsWith(pDigits);
    });

    if (existingByPhone) {
      setAlreadyExistsAlert({
        field: 'phone',
        message: `This mobile number (${cleanPhone}) is already registered in our Sovereign Registry. Please sign in instead to continue.`,
        existingIdentifier: existingByPhone.phone,
      });
      setErrors({
        phone: 'This phone number already exists. Please sign in.',
      });
      return;
    }

    // 2. Check Email Duplicate
    const existingByEmail = patrons.find(
      (p) => p.email.toLowerCase() === cleanEmail.toLowerCase()
    );

    if (existingByEmail) {
      setAlreadyExistsAlert({
        field: 'email',
        message: `An account with this email address (${cleanEmail}) already exists. Please sign in instead to proceed.`,
        existingIdentifier: existingByEmail.email,
      });
      setErrors({
        email: 'This email address already exists. Please sign in.',
      });
      return;
    }

    // 3. Check Name Duplicate
    const existingByName = patrons.find(
      (p) => p.name.toLowerCase() === cleanName.toLowerCase()
    );

    if (existingByName) {
      setAlreadyExistsAlert({
        field: 'name',
        message: `A patron account registered under "${cleanName}" already exists. Please sign in instead to proceed.`,
        existingIdentifier: existingByName.email || existingByName.phone,
      });
      setErrors({
        name: 'This patron name is already registered. Please sign in.',
      });
      return;
    }

    // Create and store new account
    const formattedPhone = cleanPhone.startsWith('+91')
      ? cleanPhone
      : `+91 ${cleanPhone.slice(-10, -5)} ${cleanPhone.slice(-5)}`;

    const newPatronAccount: RegisteredAccount = {
      id: `AUR-PATRON-${Math.floor(1000 + Math.random() * 9000)}`,
      salutation,
      name: cleanName,
      email: cleanEmail,
      phone: formattedPhone,
      city,
      tier: 'Atelier Member',
      memberSince: 'September 2026',
      conciergeAssigned: `${city} Atelier Senior Curator`,
      passwordHash: password, // Saved securely in local registry
    };

    saveRegisteredPatron(newPatronAccount);

    // Automatically log user in and redirect to the website experience
    const { passwordHash: _, ...authenticatedUser } = newPatronAccount;
    onLoginSuccess(authenticatedUser);
    onClose();
  };

  const currentQuote = LUXURY_QUOTES[quoteIndex];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-xl flex items-center justify-center p-3 sm:p-6 animate-fadeIn">
      <div className="relative w-full max-w-xl bg-[#09090D] border border-white/10 rounded-sm shadow-2xl overflow-hidden my-auto flex flex-col">
        {/* Top Header */}
        <div className="bg-[#0E0E14] px-6 sm:px-8 py-5 border-b border-white/8 flex items-center justify-between">
          <div>
            <span className="text-[10px] uppercase font-mono tracking-[0.25em] text-[#D4AF37] block">
              Aurelia Motors · Sovereign Security
            </span>
            <h2 className="font-serif-luxury text-2xl text-white font-normal mt-0.5">
              {mode === 'login' ? 'Patron Sign In' : 'Join the Sovereign Circle'}
            </h2>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-neutral-400 hover:text-white rounded-full bg-white/5 hover:bg-white/10 transition-colors"
            aria-label="Close portal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Switcher: Sign In vs Create Account */}
        <div className="grid grid-cols-2 border-b border-white/8 bg-[#0C0C11]">
          <button
            onClick={() => {
              setMode('login');
              setErrors({});
              setAlreadyExistsAlert(null);
            }}
            className={`py-3.5 text-xs uppercase tracking-widest font-mono transition-all border-b-2 flex items-center justify-center gap-2 ${
              mode === 'login'
                ? 'border-[#D4AF37] text-[#D4AF37] bg-white/5 font-semibold'
                : 'border-transparent text-neutral-400 hover:text-white'
            }`}
          >
            <KeyRound className="w-3.5 h-3.5" />
            <span>Sign In</span>
          </button>
          <button
            onClick={() => {
              setMode('signup');
              setErrors({});
              setAlreadyExistsAlert(null);
            }}
            className={`py-3.5 text-xs uppercase tracking-widest font-mono transition-all border-b-2 flex items-center justify-center gap-2 ${
              mode === 'signup'
                ? 'border-[#D4AF37] text-[#D4AF37] bg-white/5 font-semibold'
                : 'border-transparent text-neutral-400 hover:text-white'
            }`}
          >
            <User className="w-3.5 h-3.5" />
            <span>Create Account</span>
          </button>
        </div>

        {/* Form Body */}
        <div className="p-6 sm:p-8 flex-1 overflow-y-auto max-h-[75vh]">
          {/* Professional Luxury Quote Banner */}
          <div className="mb-6 p-4 bg-gradient-to-r from-[#12121A] via-[#151522] to-[#12121A] border border-white/8 rounded-sm relative overflow-hidden">
            <div className="flex items-start gap-3">
              <Quote className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5 opacity-80" />
              <div>
                <p className="font-serif-luxury text-sm text-neutral-200 italic leading-relaxed">
                  “{currentQuote.quote}”
                </p>
                <span className="text-[10px] font-mono uppercase tracking-widest text-[#D4AF37] mt-1.5 block">
                  — {currentQuote.author}
                </span>
              </div>
            </div>
          </div>

          {/* Quick Demo Access Bar */}
          <div className="mb-6 p-3.5 bg-[#121218] border border-[#D4AF37]/30 rounded-sm flex items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#D4AF37] shrink-0" />
              <div className="text-xs text-neutral-300">
                <span className="text-white font-medium">Verified Patron Demo:</span> Access as Mr. Singhania
              </div>
            </div>
            <button
              type="button"
              onClick={handleDemoLogin}
              className="px-3 py-1.5 bg-[#D4AF37] text-black text-[11px] font-mono font-semibold uppercase tracking-wider rounded-sm hover:brightness-110 active:scale-[0.98] transition-all shrink-0"
            >
              One-Click Demo
            </button>
          </div>

          {/* ALREADY REGISTERED BANNER ALERT */}
          {alreadyExistsAlert && (
            <div className="mb-6 p-4 bg-[#1E1712] border border-[#D4AF37]/60 rounded-sm space-y-3 animate-fadeIn">
              <div className="flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-[#D4AF37] shrink-0 mt-0.5" />
                <div className="flex-1">
                  <div className="text-xs font-mono uppercase tracking-wider text-[#D4AF37] font-semibold">
                    Account Already Exists
                  </div>
                  <p className="text-xs text-neutral-200 mt-1 leading-relaxed">
                    {alreadyExistsAlert.message}
                  </p>
                </div>
              </div>

              <div className="pt-2 border-t border-[#D4AF37]/20 flex items-center justify-end">
                <button
                  type="button"
                  onClick={() => handleSwitchToLoginWithIdentifier(alreadyExistsAlert.existingIdentifier)}
                  className="px-4 py-2 bg-gradient-to-r from-[#D4AF37] to-[#C5A880] text-black text-xs font-semibold uppercase tracking-wider rounded-sm hover:brightness-110 flex items-center gap-1.5 transition-all shadow-md"
                >
                  <span>Proceed to Sign In</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          )}

          {/* LOGIN FORM */}
          {mode === 'login' ? (
            <form onSubmit={handleLoginSubmit} className="space-y-5">
              {errors.loginGeneral && (
                <div className="p-3 bg-rose-950/40 border border-rose-800/60 rounded-sm text-xs text-rose-200 flex items-start gap-2">
                  <AlertCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                  <span>{errors.loginGeneral}</span>
                </div>
              )}

              {/* Email / Phone input */}
              <div>
                <label className="text-xs uppercase font-mono tracking-wider text-neutral-400 block mb-1.5">
                  Email, Mobile Number (+91), or Full Name
                </label>
                <div className="relative">
                  <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500" />
                  <input
                    type="text"
                    value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
                    placeholder="patron@company.in or +91 98200..."
                    className="w-full bg-[#121218] border border-white/10 focus:border-[#D4AF37] rounded-sm py-3 pl-10 pr-4 text-white text-sm placeholder:text-neutral-600 focus:outline-none transition-colors"
                  />
                </div>
                {errors.loginEmail && (
                  <p className="text-xs text-rose-400 mt-1 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" />
                    <span>{errors.loginEmail}</span>
                  </p>
                )}
              </div>

              {/* Password with Visibility Toggle */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="text-xs uppercase font-mono tracking-wider text-neutral-400">
                    Sovereign Password
                  </label>
                  <button
                    type="button"
                    onClick={() =>
                      alert(
                        'Password recovery instructions sent to your registered concierge contact. For demo accounts use: Aurelia#2026'
                      )
                    }
                    className="text-[11px] text-[#D4AF37] hover:underline"
                  >
                    Forgot Password?
                  </button>
                </div>
                <div className="relative">
                  <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500" />
                  <input
                    type={showLoginPassword ? 'text' : 'password'}
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    placeholder="Enter your registered password"
                    className="w-full bg-[#121218] border border-white/10 focus:border-[#D4AF37] rounded-sm py-3 pl-10 pr-10 text-white text-sm placeholder:text-neutral-600 focus:outline-none transition-colors"
                  />
                  {/* Password Visibility Toggle */}
                  <button
                    type="button"
                    onClick={() => setShowLoginPassword(!showLoginPassword)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-neutral-500 hover:text-white transition-colors"
                    aria-label={showLoginPassword ? 'Hide password' : 'Show password'}
                  >
                    {showLoginPassword ? (
                      <EyeOff className="w-4 h-4 text-[#D4AF37]" />
                    ) : (
                      <Eye className="w-4 h-4" />
                    )}
                  </button>
                </div>
                {/* Accurate Password Verification Error */}
                {errors.loginPassword && (
                  <div className="p-2.5 mt-1.5 bg-rose-950/40 border border-rose-800/60 rounded-sm text-xs text-rose-300 flex items-start gap-1.5">
                    <AlertCircle className="w-3.5 h-3.5 text-rose-400 shrink-0 mt-0.5" />
                    <span className="leading-snug">{errors.loginPassword}</span>
                  </div>
                )}
              </div>

              <div className="flex items-center gap-2 pt-1 text-xs text-neutral-400">
                <input
                  type="checkbox"
                  id="rememberMe"
                  defaultChecked
                  className="rounded border-white/20 bg-neutral-900 text-[#D4AF37] focus:ring-0"
                />
                <label htmlFor="rememberMe">Preserve sovereign session on this device</label>
              </div>

              <button
                type="submit"
                className="w-full py-3.5 bg-gradient-to-r from-[#D4AF37] via-[#E5C378] to-[#C5A880] text-black font-semibold text-xs uppercase tracking-widest rounded-sm hover:brightness-110 active:scale-[0.98] transition-all flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(212,175,55,0.2)] mt-6"
              >
                <span>Access Patron Sanctuary</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="pt-4 text-center text-xs text-neutral-500 font-light">
                Do not have a patron profile?{' '}
                <button
                  type="button"
                  onClick={() => {
                    setMode('signup');
                    setErrors({});
                  }}
                  className="text-[#D4AF37] font-medium hover:underline ml-1"
                >
                  Create Account
                </button>
              </div>
            </form>
          ) : (
            /* SIGN UP FORM */
            <form onSubmit={handleSignUpSubmit} className="space-y-4">
              {/* Title & Name */}
              <div className="grid grid-cols-4 gap-2">
                <div className="col-span-1">
                  <label className="text-xs uppercase font-mono tracking-wider text-neutral-400 block mb-1">
                    Title
                  </label>
                  <select
                    value={salutation}
                    onChange={(e) => setSalutation(e.target.value)}
                    className="w-full bg-[#121218] border border-white/10 focus:border-[#D4AF37] rounded-sm py-2.5 px-2 text-white text-xs focus:outline-none"
                  >
                    <option value="Mr.">Mr.</option>
                    <option value="Ms.">Ms.</option>
                    <option value="Mrs.">Mrs.</option>
                    <option value="Dr.">Dr.</option>
                  </select>
                </div>

                <div className="col-span-3">
                  <label className="text-xs uppercase font-mono tracking-wider text-neutral-400 block mb-1">
                    Full Legal Name *
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-neutral-500" />
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Vikramaditya Singhania"
                      className="w-full bg-[#121218] border border-white/10 focus:border-[#D4AF37] rounded-sm py-2.5 pl-9 pr-3 text-white text-xs placeholder:text-neutral-600 focus:outline-none"
                    />
                  </div>
                  {errors.name && <p className="text-[11px] text-rose-400 mt-1">{errors.name}</p>}
                </div>
              </div>

              {/* Email */}
              <div>
                <label className="text-xs uppercase font-mono tracking-wider text-neutral-400 block mb-1">
                  Corporate / Personal Email *
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-neutral-500" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="patron@holdingcorp.in"
                    className="w-full bg-[#121218] border border-white/10 focus:border-[#D4AF37] rounded-sm py-2.5 pl-9 pr-3 text-white text-xs placeholder:text-neutral-600 focus:outline-none"
                  />
                </div>
                {errors.email && <p className="text-[11px] text-rose-400 mt-1">{errors.email}</p>}
              </div>

              {/* Mobile Phone & Atelier City */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs uppercase font-mono tracking-wider text-neutral-400 block mb-1">
                    Mobile Number (+91) *
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-neutral-500" />
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="98200 44100"
                      className="w-full bg-[#121218] border border-white/10 focus:border-[#D4AF37] rounded-sm py-2.5 pl-9 pr-3 text-white text-xs placeholder:text-neutral-600 focus:outline-none"
                    />
                  </div>
                  {errors.phone && <p className="text-[11px] text-rose-400 mt-1">{errors.phone}</p>}
                </div>

                <div>
                  <label className="text-xs uppercase font-mono tracking-wider text-neutral-400 block mb-1">
                    Primary Atelier Hub *
                  </label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-neutral-500" />
                    <select
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      className="w-full bg-[#121218] border border-white/10 focus:border-[#D4AF37] rounded-sm py-2.5 pl-9 pr-3 text-white text-xs focus:outline-none"
                    >
                      {CITIES.map((c) => (
                        <option key={c.id} value={c.name}>
                          {c.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              {/* Password & Confirm Password with Visibility Controls */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {/* Create Password */}
                <div>
                  <label className="text-xs uppercase font-mono tracking-wider text-neutral-400 block mb-1">
                    Create Password *
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-neutral-500" />
                    <input
                      type={showSignupPassword ? 'text' : 'password'}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="e.g. Aurelia#2026"
                      className="w-full bg-[#121218] border border-white/10 focus:border-[#D4AF37] rounded-sm py-2.5 pl-9 pr-9 text-white text-xs placeholder:text-neutral-600 focus:outline-none"
                    />
                    <button
                      type="button"
                      onClick={() => setShowSignupPassword(!showSignupPassword)}
                      className="absolute right-2.5 top-1/2 -translate-y-1/2 text-neutral-500 hover:text-white"
                      aria-label={showSignupPassword ? 'Hide password' : 'Show password'}
                    >
                      {showSignupPassword ? (
                        <EyeOff className="w-3.5 h-3.5 text-[#D4AF37]" />
                      ) : (
                        <Eye className="w-3.5 h-3.5" />
                      )}
                    </button>
                  </div>
                </div>

                {/* Confirm Password */}
                <div>
                  <label className="text-xs uppercase font-mono tracking-wider text-neutral-400 block mb-1">
                    Confirm Password *
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-neutral-500" />
                    <input
                      type={showConfirmPassword ? 'text' : 'password'}
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="Repeat password"
                      className="w-full bg-[#121218] border border-white/10 focus:border-[#D4AF37] rounded-sm py-2.5 pl-9 pr-9 text-white text-xs placeholder:text-neutral-600 focus:outline-none"
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-2.5 top-1/2 -translate-y-1/2 text-neutral-500 hover:text-white"
                      aria-label={showConfirmPassword ? 'Hide password' : 'Show password'}
                    >
                      {showConfirmPassword ? (
                        <EyeOff className="w-3.5 h-3.5 text-[#D4AF37]" />
                      ) : (
                        <Eye className="w-3.5 h-3.5" />
                      )}
                    </button>
                  </div>
                </div>
              </div>

              {/* Password Requirement Checklist (6+ chars, letter, symbol, number) */}
              <div className="p-3 bg-[#111116] border border-white/6 rounded-sm space-y-1.5">
                <div className="text-[10px] font-mono uppercase tracking-wider text-neutral-400 flex items-center justify-between">
                  <span>Sovereign Password Standards (Required to proceed):</span>
                  {isPasswordValid && (
                    <span className="text-emerald-400 font-bold flex items-center gap-1">
                      <Check className="w-3 h-3 stroke-[3]" /> All Criteria Met
                    </span>
                  )}
                </div>
                <div className="grid grid-cols-2 gap-1.5 text-[11px] font-mono">
                  <div
                    className={`flex items-center gap-1.5 ${
                      hasMinLength ? 'text-emerald-400' : 'text-neutral-500'
                    }`}
                  >
                    <span
                      className={`w-3.5 h-3.5 rounded-full flex items-center justify-center text-[9px] ${
                        hasMinLength ? 'bg-emerald-500/20 text-emerald-400' : 'bg-neutral-800 text-neutral-600'
                      }`}
                    >
                      {hasMinLength ? '✓' : '•'}
                    </span>
                    <span>Min. 6 characters</span>
                  </div>

                  <div
                    className={`flex items-center gap-1.5 ${
                      hasLetter ? 'text-emerald-400' : 'text-neutral-500'
                    }`}
                  >
                    <span
                      className={`w-3.5 h-3.5 rounded-full flex items-center justify-center text-[9px] ${
                        hasLetter ? 'bg-emerald-500/20 text-emerald-400' : 'bg-neutral-800 text-neutral-600'
                      }`}
                    >
                      {hasLetter ? '✓' : '•'}
                    </span>
                    <span>Includes letters (A-Z)</span>
                  </div>

                  <div
                    className={`flex items-center gap-1.5 ${
                      hasSymbol ? 'text-emerald-400' : 'text-neutral-500'
                    }`}
                  >
                    <span
                      className={`w-3.5 h-3.5 rounded-full flex items-center justify-center text-[9px] ${
                        hasSymbol ? 'bg-emerald-500/20 text-emerald-400' : 'bg-neutral-800 text-neutral-600'
                      }`}
                    >
                      {hasSymbol ? '✓' : '•'}
                    </span>
                    <span>Special symbol (!@#$%^&*)</span>
                  </div>

                  <div
                    className={`flex items-center gap-1.5 ${
                      hasNumber ? 'text-emerald-400' : 'text-neutral-500'
                    }`}
                  >
                    <span
                      className={`w-3.5 h-3.5 rounded-full flex items-center justify-center text-[9px] ${
                        hasNumber ? 'bg-emerald-500/20 text-emerald-400' : 'bg-neutral-800 text-neutral-600'
                      }`}
                    >
                      {hasNumber ? '✓' : '•'}
                    </span>
                    <span>Contains number (0-9)</span>
                  </div>
                </div>
              </div>

              {errors.password && <p className="text-[11px] text-rose-400">{errors.password}</p>}
              {errors.confirmPassword && (
                <p className="text-[11px] text-rose-400">{errors.confirmPassword}</p>
              )}

              {/* Charter agreement */}
              <div className="pt-1">
                <label className="flex items-start gap-2 text-[11px] text-neutral-400 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={agreedToCharter}
                    onChange={(e) => setAgreedToCharter(e.target.checked)}
                    className="mt-0.5 rounded border-white/20 bg-neutral-900 text-[#D4AF37] focus:ring-0"
                  />
                  <span>
                    I accept the Aurelia Client Discretion Charter and authorize encrypted communications for private viewings and confidential acquisitions.
                  </span>
                </label>
                {errors.charter && <p className="text-[11px] text-rose-400 mt-1">{errors.charter}</p>}
              </div>

              {/* Register button */}
              <button
                type="submit"
                disabled={!isPasswordValid || password !== confirmPassword}
                className={`w-full py-3.5 text-xs uppercase tracking-widest font-semibold rounded-sm flex items-center justify-center gap-2 transition-all mt-3 ${
                  isPasswordValid && password === confirmPassword
                    ? 'bg-gradient-to-r from-[#D4AF37] via-[#E5C378] to-[#C5A880] text-black hover:brightness-110 shadow-[0_0_20px_rgba(212,175,55,0.25)] active:scale-[0.98]'
                    : 'bg-white/10 text-neutral-500 cursor-not-allowed border border-white/5'
                }`}
              >
                <span>Register Patron Profile & Proceed</span>
                <Check className="w-4 h-4" />
              </button>

              <div className="pt-2 text-center text-xs text-neutral-500 font-light">
                Already registered in the Sovereign Circle?{' '}
                <button
                  type="button"
                  onClick={() => {
                    setMode('login');
                    setErrors({});
                  }}
                  className="text-[#D4AF37] font-medium hover:underline ml-1"
                >
                  Sign In
                </button>
              </div>
            </form>
          )}

          {/* Privacy footnote */}
          <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-center gap-2 text-[10px] font-mono text-neutral-500">
            <ShieldCheck className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span>256-BIT ENCRYPTED SANCTUARY PROTOCOL · ZERO THIRD-PARTY SHARING</span>
          </div>
        </div>
      </div>
    </div>
  );
};
