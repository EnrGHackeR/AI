"use client";

import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Eye, EyeOff, Sparkles, UserPlus } from "lucide-react";
import { cn } from "@/lib/utils";

interface PupilProps {
  size?: number;
  maxDistance?: number;
  pupilColor?: string;
  forceLookX?: number;
  forceLookY?: number;
}

const Pupil = ({ size = 12, maxDistance = 5, pupilColor = "black", forceLookX, forceLookY }: PupilProps) => {
  const [mouseX, setMouseX] = useState(0);
  const [mouseY, setMouseY] = useState(0);
  const pupilRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => { setMouseX(e.clientX); setMouseY(e.clientY); };
    window.addEventListener("mousemove", handler);
    return () => window.removeEventListener("mousemove", handler);
  }, []);

  const pos = (() => {
    if (!pupilRef.current) return { x: 0, y: 0 };
    if (forceLookX !== undefined && forceLookY !== undefined) return { x: forceLookX, y: forceLookY };
    const r = pupilRef.current.getBoundingClientRect();
    const dx = mouseX - (r.left + r.width / 2);
    const dy = mouseY - (r.top + r.height / 2);
    const d = Math.min(Math.sqrt(dx ** 2 + dy ** 2), maxDistance);
    const a = Math.atan2(dy, dx);
    return { x: Math.cos(a) * d, y: Math.sin(a) * d };
  })();

  return (
    <div ref={pupilRef} className="rounded-full" style={{
      width: size, height: size, backgroundColor: pupilColor,
      transform: `translate(${pos.x}px, ${pos.y}px)`, transition: 'transform 0.1s ease-out',
    }} />
  );
};

interface EyeBallProps {
  size?: number; pupilSize?: number; maxDistance?: number;
  eyeColor?: string; pupilColor?: string; isBlinking?: boolean;
  forceLookX?: number; forceLookY?: number;
}

const EyeBall = ({ size = 48, pupilSize = 16, maxDistance = 10, eyeColor = "white", pupilColor = "black", isBlinking = false, forceLookX, forceLookY }: EyeBallProps) => {
  const [mouseX, setMouseX] = useState(0);
  const [mouseY, setMouseY] = useState(0);
  const eyeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => { setMouseX(e.clientX); setMouseY(e.clientY); };
    window.addEventListener("mousemove", handler);
    return () => window.removeEventListener("mousemove", handler);
  }, []);

  const pos = (() => {
    if (!eyeRef.current) return { x: 0, y: 0 };
    if (forceLookX !== undefined && forceLookY !== undefined) return { x: forceLookX, y: forceLookY };
    const r = eyeRef.current.getBoundingClientRect();
    const dx = mouseX - (r.left + r.width / 2);
    const dy = mouseY - (r.top + r.height / 2);
    const d = Math.min(Math.sqrt(dx ** 2 + dy ** 2), maxDistance);
    const a = Math.atan2(dy, dx);
    return { x: Math.cos(a) * d, y: Math.sin(a) * d };
  })();

  return (
    <div ref={eyeRef} className="rounded-full flex items-center justify-center transition-all duration-150"
      style={{ width: size, height: isBlinking ? 2 : size, backgroundColor: eyeColor, overflow: 'hidden' }}>
      {!isBlinking && (
        <div className="rounded-full" style={{
          width: pupilSize, height: pupilSize, backgroundColor: pupilColor,
          transform: `translate(${pos.x}px, ${pos.y}px)`, transition: 'transform 0.1s ease-out',
        }} />
      )}
    </div>
  );
};

const NATIONALITIES = [
  "Afghan","Albanian","Algerian","American","Argentinian","Australian","Bangladeshi","Belgian",
  "Brazilian","British","Canadian","Chinese","Colombian","Cuban","Danish","Dutch","Egyptian",
  "Ethiopian","Filipino","Finnish","French","German","Ghanaian","Greek","Hungarian","Indian",
  "Indonesian","Iranian","Iraqi","Irish","Israeli","Italian","Jamaican","Japanese","Jordanian",
  "Kenyan","Korean","Lebanese","Malaysian","Mexican","Moroccan","Nepali","New Zealander",
  "Nigerian","Norwegian","Pakistani","Peruvian","Polish","Portuguese","Romanian","Russian",
  "Saudi","Singaporean","South African","Spanish","Sri Lankan","Swedish","Swiss","Syrian",
  "Thai","Tunisian","Turkish","Ukrainian","Emirati","Venezuelan","Vietnamese","Zimbabwean"
];

function SignupPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [mobile, setMobile] = useState("");
  const [email, setEmail] = useState("");
  const [parentName, setParentName] = useState("");
  const [nationality, setNationality] = useState("");
  const [gender, setGender] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isNgoWorker, setIsNgoWorker] = useState(false);
  const [ngoName, setNgoName] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [mouseX, setMouseX] = useState(0);
  const [mouseY, setMouseY] = useState(0);
  const [isPurpleBlinking, setIsPurpleBlinking] = useState(false);
  const [isBlackBlinking, setIsBlackBlinking] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [isLookingAtEachOther, setIsLookingAtEachOther] = useState(false);
  const purpleRef = useRef<HTMLDivElement>(null);
  const blackRef = useRef<HTMLDivElement>(null);
  const yellowRef = useRef<HTMLDivElement>(null);
  const orangeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => { setMouseX(e.clientX); setMouseY(e.clientY); };
    window.addEventListener("mousemove", handler);
    return () => window.removeEventListener("mousemove", handler);
  }, []);

  useEffect(() => {
    const schedule = () => {
      const t = setTimeout(() => {
        setIsPurpleBlinking(true);
        setTimeout(() => { setIsPurpleBlinking(false); schedule(); }, 150);
      }, Math.random() * 4000 + 3000);
      return t;
    };
    const t = schedule();
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const schedule = () => {
      const t = setTimeout(() => {
        setIsBlackBlinking(true);
        setTimeout(() => { setIsBlackBlinking(false); schedule(); }, 150);
      }, Math.random() * 4000 + 3000);
      return t;
    };
    const t = schedule();
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (isTyping) {
      setIsLookingAtEachOther(true);
      const t = setTimeout(() => setIsLookingAtEachOther(false), 800);
      return () => clearTimeout(t);
    }
    setIsLookingAtEachOther(false);
  }, [isTyping]);

  const calcPos = (ref: React.RefObject<HTMLDivElement | null>) => {
    if (!ref.current) return { faceX: 0, faceY: 0, bodySkew: 0 };
    const r = ref.current.getBoundingClientRect();
    const dx = mouseX - (r.left + r.width / 2);
    const dy = mouseY - (r.top + r.height / 3);
    return {
      faceX: Math.max(-15, Math.min(15, dx / 20)),
      faceY: Math.max(-10, Math.min(10, dy / 30)),
      bodySkew: Math.max(-6, Math.min(6, -dx / 120)),
    };
  };

  const purplePos = calcPos(purpleRef);
  const blackPos = calcPos(blackRef);
  const yellowPos = calcPos(yellowRef);
  const orangePos = calcPos(orangeRef);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    if (password.length < 4) {
      setError("Password must be at least 4 characters.");
      return;
    }
    if (isNgoWorker && !ngoName.trim()) {
      setError("Please enter your NGO name.");
      return;
    }

    setIsLoading(true);
    await new Promise(r => setTimeout(r, 500));
    console.log("✅ Signup data:", { firstName, lastName, mobile, email, parentName, nationality, gender, isNgoWorker, ngoName });
    alert(`Account created successfully! Welcome, ${firstName}!`);
    setIsLoading(false);
  };

  const inputFocusProps = { onFocus: () => setIsTyping(true), onBlur: () => setIsTyping(false) };

  return (
    <div className="min-h-screen grid lg:grid-cols-2">
      {/* Left - Animated Characters */}
      <div className="relative hidden lg:flex flex-col justify-between bg-gradient-to-br from-primary/90 via-primary to-primary/80 p-12 text-primary-foreground">
        <div className="relative z-20">
          <div className="flex items-center gap-2 text-lg font-semibold">
            <div className="size-8 rounded-lg bg-primary-foreground/10 backdrop-blur-sm flex items-center justify-center">
              <Sparkles className="size-4" />
            </div>
            <span>YourBrand</span>
          </div>
        </div>

        <div className="relative z-20 flex items-end justify-center h-[500px]">
          <div className="relative" style={{ width: 550, height: 400 }}>
            {/* Purple character */}
            <div ref={purpleRef} className="absolute bottom-0 transition-all duration-700 ease-in-out"
              style={{
                left: 70, width: 180,
                height: isTyping ? 440 : 400,
                backgroundColor: '#6C3FF5', borderRadius: '10px 10px 0 0', zIndex: 1,
                transform: isTyping
                  ? `skewX(${(purplePos.bodySkew || 0) - 12}deg) translateX(40px)`
                  : `skewX(${purplePos.bodySkew || 0}deg)`,
                transformOrigin: 'bottom center',
              }}>
              <div className="absolute flex gap-8 transition-all duration-700 ease-in-out"
                style={{
                  left: isLookingAtEachOther ? 55 : 45 + purplePos.faceX,
                  top: isLookingAtEachOther ? 65 : 40 + purplePos.faceY,
                }}>
                <EyeBall size={18} pupilSize={7} maxDistance={5} eyeColor="white" pupilColor="#2D2D2D"
                  isBlinking={isPurpleBlinking}
                  forceLookX={isLookingAtEachOther ? 3 : undefined}
                  forceLookY={isLookingAtEachOther ? 4 : undefined} />
                <EyeBall size={18} pupilSize={7} maxDistance={5} eyeColor="white" pupilColor="#2D2D2D"
                  isBlinking={isPurpleBlinking}
                  forceLookX={isLookingAtEachOther ? 3 : undefined}
                  forceLookY={isLookingAtEachOther ? 4 : undefined} />
              </div>
            </div>

            {/* Black character */}
            <div ref={blackRef} className="absolute bottom-0 transition-all duration-700 ease-in-out"
              style={{
                left: 240, width: 120, height: 310,
                backgroundColor: '#2D2D2D', borderRadius: '8px 8px 0 0', zIndex: 2,
                transform: isLookingAtEachOther
                  ? `skewX(${(blackPos.bodySkew || 0) * 1.5 + 10}deg) translateX(20px)`
                  : `skewX(${blackPos.bodySkew || 0}deg)`,
                transformOrigin: 'bottom center',
              }}>
              <div className="absolute flex gap-6 transition-all duration-700 ease-in-out"
                style={{
                  left: isLookingAtEachOther ? 32 : 26 + blackPos.faceX,
                  top: isLookingAtEachOther ? 12 : 32 + blackPos.faceY,
                }}>
                <EyeBall size={16} pupilSize={6} maxDistance={4} eyeColor="white" pupilColor="#2D2D2D"
                  isBlinking={isBlackBlinking}
                  forceLookX={isLookingAtEachOther ? 0 : undefined}
                  forceLookY={isLookingAtEachOther ? -4 : undefined} />
                <EyeBall size={16} pupilSize={6} maxDistance={4} eyeColor="white" pupilColor="#2D2D2D"
                  isBlinking={isBlackBlinking}
                  forceLookX={isLookingAtEachOther ? 0 : undefined}
                  forceLookY={isLookingAtEachOther ? -4 : undefined} />
              </div>
            </div>

            {/* Orange character */}
            <div ref={orangeRef} className="absolute bottom-0 transition-all duration-700 ease-in-out"
              style={{
                left: 0, width: 240, height: 200, zIndex: 3,
                backgroundColor: '#FF9B6B', borderRadius: '120px 120px 0 0',
                transform: `skewX(${orangePos.bodySkew || 0}deg)`, transformOrigin: 'bottom center',
              }}>
              <div className="absolute flex gap-8 transition-all duration-200 ease-out"
                style={{ left: 82 + (orangePos.faceX || 0), top: 90 + (orangePos.faceY || 0) }}>
                <Pupil size={12} maxDistance={5} pupilColor="#2D2D2D" />
                <Pupil size={12} maxDistance={5} pupilColor="#2D2D2D" />
              </div>
            </div>

            {/* Yellow character */}
            <div ref={yellowRef} className="absolute bottom-0 transition-all duration-700 ease-in-out"
              style={{
                left: 310, width: 140, height: 230,
                backgroundColor: '#E8D754', borderRadius: '70px 70px 0 0', zIndex: 4,
                transform: `skewX(${yellowPos.bodySkew || 0}deg)`, transformOrigin: 'bottom center',
              }}>
              <div className="absolute flex gap-6 transition-all duration-200 ease-out"
                style={{ left: 52 + (yellowPos.faceX || 0), top: 40 + (yellowPos.faceY || 0) }}>
                <Pupil size={12} maxDistance={5} pupilColor="#2D2D2D" />
                <Pupil size={12} maxDistance={5} pupilColor="#2D2D2D" />
              </div>
              <div className="absolute w-20 h-[4px] bg-[#2D2D2D] rounded-full transition-all duration-200 ease-out"
                style={{ left: 40 + (yellowPos.faceX || 0), top: 88 + (yellowPos.faceY || 0) }} />
            </div>
          </div>
        </div>

        <div className="relative z-20 flex items-center gap-8 text-sm text-primary-foreground/60">
          <a href="#" className="hover:text-primary-foreground transition-colors">Privacy Policy</a>
          <a href="#" className="hover:text-primary-foreground transition-colors">Terms of Service</a>
          <a href="#" className="hover:text-primary-foreground transition-colors">Contact</a>
        </div>

        <div className="absolute inset-0 bg-grid-white/[0.05] bg-[size:20px_20px]" />
        <div className="absolute top-1/4 right-1/4 size-64 bg-primary-foreground/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 left-1/4 size-96 bg-primary-foreground/5 rounded-full blur-3xl" />
      </div>

      {/* Right - Sign Up Form */}
      <div className="flex items-start justify-center p-8 bg-background overflow-y-auto max-h-screen">
        <div className="w-full max-w-[480px] py-6">
          <div className="lg:hidden flex items-center justify-center gap-2 text-lg font-semibold mb-8">
            <div className="size-8 rounded-lg bg-primary/10 flex items-center justify-center">
              <Sparkles className="size-4 text-primary" />
            </div>
            <span>YourBrand</span>
          </div>

          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold tracking-tight mb-2">Create your account</h1>
            <p className="text-muted-foreground text-sm">Fill in the details to get started</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Name Row */}
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <Label htmlFor="firstName" className="text-sm font-medium">First Name</Label>
                <Input id="firstName" placeholder="John" value={firstName}
                  onChange={e => setFirstName(e.target.value)} required
                  className="h-11 bg-background border-border/60 focus:border-primary" {...inputFocusProps} />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="lastName" className="text-sm font-medium">Last Name</Label>
                <Input id="lastName" placeholder="Doe" value={lastName}
                  onChange={e => setLastName(e.target.value)} required
                  className="h-11 bg-background border-border/60 focus:border-primary" {...inputFocusProps} />
              </div>
            </div>

            {/* Mobile & Email */}
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <Label htmlFor="mobile" className="text-sm font-medium">Mobile Number</Label>
                <Input id="mobile" type="tel" placeholder="+91 98765 43210" value={mobile}
                  onChange={e => setMobile(e.target.value)} required
                  className="h-11 bg-background border-border/60 focus:border-primary" {...inputFocusProps} />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="signupEmail" className="text-sm font-medium">Email ID</Label>
                <Input id="signupEmail" type="email" placeholder="john@example.com" value={email}
                  onChange={e => setEmail(e.target.value)} required
                  className="h-11 bg-background border-border/60 focus:border-primary" {...inputFocusProps} />
              </div>
            </div>

            {/* Parent Name */}
            <div className="space-y-1.5">
              <Label htmlFor="parentName" className="text-sm font-medium">Parent&apos;s Name</Label>
              <Input id="parentName" placeholder="Parent / Guardian name" value={parentName}
                onChange={e => setParentName(e.target.value)} required
                className="h-11 bg-background border-border/60 focus:border-primary" {...inputFocusProps} />
            </div>

            {/* Nationality & Gender */}
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <Label className="text-sm font-medium">Nationality</Label>
                <Select value={nationality} onValueChange={setNationality}>
                  <SelectTrigger className="h-11 w-full bg-background border-border/60">
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent>
                    {NATIONALITIES.map(n => (
                      <SelectItem key={n} value={n}>{n}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-1.5">
                <Label className="text-sm font-medium">Gender</Label>
                <RadioGroup value={gender} onValueChange={setGender} className="flex gap-4 pt-2">
                  {["Male", "Female", "Other"].map(g => (
                    <div key={g} className="flex items-center gap-1.5">
                      <RadioGroupItem value={g} id={`gender-${g}`} />
                      <Label htmlFor={`gender-${g}`} className="text-sm font-normal cursor-pointer">{g}</Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>
            </div>

            {/* Passwords */}
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <Label htmlFor="signupPassword" className="text-sm font-medium">Password</Label>
                <div className="relative">
                  <Input id="signupPassword" type={showPassword ? "text" : "password"}
                    placeholder="••••••••" value={password}
                    onChange={e => setPassword(e.target.value)} required
                    className="h-11 pr-9 bg-background border-border/60 focus:border-primary" {...inputFocusProps} />
                  <button type="button" onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors">
                    {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                  </button>
                </div>
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="confirmPassword" className="text-sm font-medium">Confirm Password</Label>
                <div className="relative">
                  <Input id="confirmPassword" type={showConfirm ? "text" : "password"}
                    placeholder="••••••••" value={confirmPassword}
                    onChange={e => setConfirmPassword(e.target.value)} required
                    className="h-11 pr-9 bg-background border-border/60 focus:border-primary" {...inputFocusProps} />
                  <button type="button" onClick={() => setShowConfirm(!showConfirm)}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors">
                    {showConfirm ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                  </button>
                </div>
              </div>
            </div>

            {/* NGO Worker Checkbox */}
            <div className="space-y-3 rounded-lg border border-border/40 p-4">
              <div className="flex items-center space-x-2">
                <Checkbox id="ngoWorker" checked={isNgoWorker}
                  onCheckedChange={(c) => { setIsNgoWorker(c === true); if (!c) setNgoName(""); }} />
                <Label htmlFor="ngoWorker" className="text-sm font-normal cursor-pointer">
                  I am an NGO Worker
                </Label>
              </div>
              {isNgoWorker && (
                <div className="space-y-1.5 pl-6 animate-in fade-in slide-in-from-top-1 duration-200">
                  <Label htmlFor="ngoName" className="text-sm font-medium">NGO Name</Label>
                  <Input id="ngoName" placeholder="Enter your NGO name" value={ngoName}
                    onChange={e => setNgoName(e.target.value)}
                    className="h-11 bg-background border-border/60 focus:border-primary" {...inputFocusProps} />
                </div>
              )}
            </div>

            {error && (
              <div className="p-3 text-sm text-red-400 bg-red-950/20 border border-red-900/30 rounded-lg">
                {error}
              </div>
            )}

            <Button type="submit" className="w-full h-12 text-base font-medium" size="lg" disabled={isLoading}>
              <UserPlus className="mr-2 size-5" />
              {isLoading ? "Creating account..." : "Sign Up"}
            </Button>
          </form>

          <div className="text-center text-sm text-muted-foreground mt-6">
            Already have an account?{" "}
            <a href="/login" className="text-foreground font-medium hover:underline">Log In</a>
          </div>
        </div>
      </div>
    </div>
  );
}

export const Component = SignupPage;
