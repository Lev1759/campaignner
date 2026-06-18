
"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { useForm, useFieldArray, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { motion, AnimatePresence } from "motion/react";
import {
  User,
  ImageIcon,
  Briefcase,
  FileText,
  Eye,
  ChevronRight,
  ChevronLeft,
  Plus,
  Trash2,
  CheckCircle2,
  Upload,
  AlertCircle,
  Building2,
  GraduationCap,
  MapPin,
  Calendar,
  UserCheck,
  BookOpen,
  Shield,
  Landmark,
  Cpu,
  Users,
  HeartPulse,
  Zap,
  Wheat,
  Globe,
  BadgeCheck,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Field,
  FieldLabel,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLegend,
  FieldSeparator,
  FieldSet,
  FieldContent,
  FieldTitle,
} from "@/components/ui/field";
import statesRaw from "@/assets/states.json";

// ─── Typed states data ──────────────────────────────────────────────────────────

interface StateEntry {
  state: string;
  alias: string;
  lgas: string[];
}

const statesData = statesRaw as StateEntry[];

// ─── Zod Schemas ─────────────────────────────────────────────────────────────────

const portfolioItemSchema = z.object({
  title: z.string().min(1, "Position title is required"),
  period: z.string().min(1, "Period is required"),
  description: z.string().min(1, "Description is required"),
});

const manifestoSchema = z.object({
  economy: z.string().optional(),
  education: z.string().optional(),
  health: z.string().optional(),
  security: z.string().optional(),
  infrastructure: z.string().optional(),
  agriculture: z.string().optional(),
  technology: z.string().optional(),
  youth: z.string().optional(),
  environment: z.string().optional(),
  housing: z.string().optional(),
  justice: z.string().optional(),
  womenAndGender: z.string().optional(),
  foreignPolicy: z.string().optional(),
  publicService: z.string().optional(),
});

const step1Schema = z.object({
  title: z.string().optional(),
  firstName: z.string().min(1, "First name is required"),
  middleName: z.string().optional(),
  lastName: z.string().min(1, "Last name is required"),
  age: z.string().min(1, "Age is required").refine((val) => {
    const num = parseInt(val, 10);
    return !isNaN(num) && num >= 18 && num <= 120;
  }, "Age must be between 18 and 120"),
  gender: z.string().min(1, "Gender is required"),
  phone: z.string().min(1, "Phone number is required"),
  email: z.string().min(1, "Email is required").email("Invalid email address"),
  education: z.string().min(1, "Education level is required"),
  occupation: z.string().min(1, "Occupation is required"),
  state: z.string().min(1, "State of origin is required"),
  lga: z.string().min(1, "LGA is required"),
  address: z.string().optional(),
  bio: z.string().min(1, "Biography is required"),
  avatar: z.string().optional(),
  banner: z.string().optional(),
});

const step2Schema = z.object({
  office: z.string().min(1, "Office is required"),
  party: z.string().min(1, "Party is required"),
  contestingState: z.string().min(1, "Constituency/State is required"),
  contestingLga: z.string().optional(),
  portfolio: z.array(portfolioItemSchema).min(1, "At least one portfolio item is required"),
  manifesto: manifestoSchema,
});

type Step1FormData = z.infer<typeof step1Schema>;
type Step2FormData = z.infer<typeof step2Schema>;

// ─── Constants ──────────────────────────────────────────────────────────────────

const STORAGE_KEY_STEP1 = "candidate_onboarding_step1";
const STORAGE_KEY_STEP2 = "candidate_onboarding_step2";

const TITLES = [
  "Mr.", "Mrs.", "Ms.", "Dr.", "Prof.", "Engr.", "Barr.",
  "Hon.", "Sen.", "Alhaji", "Hajia", "Chief", "Rt. Hon.",
];

const OFFICES = [
  "President",
  "Vice President",
  "Governor",
  "Deputy Governor",
  "Senator",
  "House of Representatives",
  "House of Assembly",
  "Local Government Chairman",
];

const PARTIES = [
  "APC", "PDP", "LP", "NNPP", "APGA", "SDP", "ADC", "ZLP",
  "AAC", "PRP", "NDC", "YPP", "ADP", "NRM", "BP",
];

const EDUCATION_LEVELS = [
  "FSLC",
  "WAEC / NECO",
  "OND / NCE",
  "HND / BSc",
  "Postgraduate Diploma",
  "MSc / MBA / LLM",
  "PhD / DVM / MBBS",
  "Other",
];

interface ManifestoSectorDef {
  key: keyof z.infer<typeof manifestoSchema>;
  label: string;
  icon: React.ReactNode;
  placeholder: string;
  description: string;
}

const MANIFESTO_SECTORS: ManifestoSectorDef[] = [
  {
    key: "economy",
    label: "Economy & Jobs",
    icon: <Building2 className="w-3.5 h-3.5" />,
    placeholder: "Outline your economic policies, job creation targets, trade and investment agenda...",
    description: "Share your vision for economic growth and employment opportunities.",
  },
  {
    key: "education",
    label: "Education",
    icon: <GraduationCap className="w-3.5 h-3.5" />,
    placeholder: "Describe reforms to schools, universities, curriculum, teacher welfare, literacy programs...",
    description: "Your plans for improving educational access and quality.",
  },
  {
    key: "health",
    label: "Health",
    icon: <HeartPulse className="w-3.5 h-3.5" />,
    placeholder: "Detail your healthcare coverage plans, hospital infrastructure, insurance, primary care...",
    description: "Your strategy for healthcare delivery and public health.",
  },
  {
    key: "security",
    label: "Security",
    icon: <Shield className="w-3.5 h-3.5" />,
    placeholder: "Explain your security architecture, policing reforms, anti-terrorism, community safety...",
    description: "Your approach to ensuring public safety and security.",
  },
  {
    key: "infrastructure",
    label: "Infrastructure",
    icon: <Zap className="w-3.5 h-3.5" />,
    placeholder: "Roads, rail, power, water, bridges — your capital infrastructure commitments...",
    description: "Your infrastructure development priorities and investments.",
  },
  {
    key: "agriculture",
    label: "Agriculture",
    icon: <Wheat className="w-3.5 h-3.5" />,
    placeholder: "Farmer support, food security, irrigation, value chain development, subsidies...",
    description: "Your agricultural policies and food security plans.",
  },
  {
    key: "technology",
    label: "Technology",
    icon: <Cpu className="w-3.5 h-3.5" />,
    placeholder: "Digital economy, broadband, e-governance, fintech, startup ecosystem, AI...",
    description: "Your vision for technology adoption and digital transformation.",
  },
  {
    key: "youth",
    label: "Youth & Sports",
    icon: <Users className="w-3.5 h-3.5" />,
    placeholder: "Youth employment, skills acquisition, NYSC reform, sports infrastructure...",
    description: "Your youth empowerment and sports development initiatives.",
  },
  {
    key: "environment",
    label: "Environment",
    icon: <Globe className="w-3.5 h-3.5" />,
    placeholder: "Climate action, deforestation, clean energy, pollution control, waste management...",
    description: "Your environmental sustainability and climate action plans.",
  },
  {
    key: "housing",
    label: "Housing & Urban Dev.",
    icon: <Landmark className="w-3.5 h-3.5" />,
    placeholder: "Affordable housing, land reform, slum upgrading, urban master plans, rent control...",
    description: "Your housing and urban development policies.",
  },
  {
    key: "justice",
    label: "Justice & Rule of Law",
    icon: <BookOpen className="w-3.5 h-3.5" />,
    placeholder: "Judicial independence, anti-corruption, prison reform, legal aid, EFCC/ICPC reform...",
    description: "Your justice sector reforms and legal framework improvements.",
  },
  {
    key: "womenAndGender",
    label: "Women & Gender",
    icon: <UserCheck className="w-3.5 h-3.5" />,
    placeholder: "Gender-responsive policy, female representation, GBV prevention, maternal health...",
    description: "Your gender equality and women empowerment agenda.",
  },
  {
    key: "foreignPolicy",
    label: "Foreign Policy",
    icon: <Globe className="w-3.5 h-3.5" />,
    placeholder: "Diaspora policy, trade diplomacy, ECOWAS relations, bilateral agreements...",
    description: "Your international relations and diaspora engagement strategies.",
  },
  {
    key: "publicService",
    label: "Public Service Reform",
    icon: <Briefcase className="w-3.5 h-3.5" />,
    placeholder: "Civil service efficiency, e-government, MDAs reform, reducing bureaucracy...",
    description: "Your public sector modernization and efficiency plans.",
  },
];

// ─── Default Values ────────────────────────────────────────────────────────────

const EMPTY_STEP1: Step1FormData = {
  title: "", firstName: "", middleName: "", lastName: "",
  age: "", gender: "", phone: "", email: "",
  education: "", occupation: "", state: "", lga: "",
  address: "", bio: "", avatar: "", banner: "",
};

const EMPTY_STEP2: Step2FormData = {
  office: "", party: "", contestingState: "", contestingLga: "",
  portfolio: [{ title: "", period: "", description: "" }],
  manifesto: {
    economy: "", education: "", health: "", security: "",
    infrastructure: "", agriculture: "", technology: "", youth: "",
    environment: "", housing: "", justice: "", womenAndGender: "",
    foreignPolicy: "", publicService: "",
  },
};

// ─── Step Indicator ─────────────────────────────────────────────────────────────

function StepIndicator({ current }: { current: number }) {
  const steps = [
    { label: "Bio", icon: <User className="w-4 h-4" /> },
    { label: "Political", icon: <Briefcase className="w-4 h-4" /> },
    { label: "Preview", icon: <Eye className="w-4 h-4" /> },
  ];
  return (
    <div className="flex items-center justify-between mb-10">
      {steps.map((step, idx) => {
        const num = idx + 1;
        const done = current > num;
        const active = current === num;
        return (
          <div key={num} className="flex items-center flex-1">
            <div className="flex flex-col items-center gap-1.5">
              <div
                className={`w-9 h-9 rounded-full flex items-center justify-center font-semibold text-sm transition-all border-2
                  ${done
                    ? "bg-primary border-primary text-primary-foreground"
                    : active
                    ? "bg-background border-primary text-primary shadow-sm"
                    : "bg-background border-border text-muted-foreground"
                  }`}
              >
                {done ? <CheckCircle2 className="w-4 h-4" /> : step.icon}
              </div>
              <span
                className={`text-[11px] font-medium
                  ${active ? "text-primary" : done ? "text-primary/60" : "text-muted-foreground"}`}
              >
                {step.label}
              </span>
            </div>
            {idx < steps.length - 1 && (
              <div
                className={`flex-1 h-px mx-3 mb-5 transition-all
                  ${current > num ? "bg-primary" : "bg-border"}`}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}

// ─── Section header ─────────────────────────────────────────────────────────────

function SectionHeader({ icon, title }: { icon: React.ReactNode; title: string }) {
  return (
    <div className="flex items-center gap-2 pb-2 border-b">
      <span className="text-muted-foreground">{icon}</span>
      <h3 className="text-sm font-semibold text-foreground">{title}</h3>
    </div>
  );
}

// ─── Image Uploader ─────────────────────────────────────────────────────────────

interface ImageUploaderProps {
  value: string;
  onChange: (v: string) => void;
  label: string;
  description?: string;
  hint: string;
  aspect?: "square" | "banner";
}

function ImageUploader({
  value,
  onChange,
  label,
  description,
  hint,
  aspect = "square",
}: ImageUploaderProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => onChange(reader.result as string);
    reader.readAsDataURL(file);
  };

  return (
    <Field className="w-full">
      <FieldLabel>{label}</FieldLabel>
      {description && <FieldDescription>{description}</FieldDescription>}
      <FieldContent>
        <div
          onClick={() => inputRef.current?.click()}
          className={`relative cursor-pointer rounded-md border-2 border-dashed border-input bg-background hover:border-primary/50 hover:bg-accent/30 transition-colors overflow-hidden group
            ${aspect === "banner" ? "h-28 w-full" : "h-24 w-24"}`}
        >
          {value ? (
            <img src={value} alt={label} className="w-full h-full object-cover" />
          ) : (
            <div className="flex flex-col items-center justify-center h-full gap-1.5 text-muted-foreground group-hover:text-primary transition-colors p-3">
              <Upload className="w-5 h-5" />
              <span className="text-[10px] text-center leading-snug">{hint}</span>
            </div>
          )}
          {value && (
            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <span className="text-white text-xs font-medium">Change</span>
            </div>
          )}
        </div>
      </FieldContent>
      <input ref={inputRef} type="file" accept="image/*" className="hidden" onChange={handleFile} />
      <FieldError />
    </Field>
  );
}

// ─── STEP 1: BIO ────────────────────────────────────────────────────────────────

function Step1({ form }: { form: any }) {
  const stateValue = form.watch("state");
  const stateEntry = statesData.find((s) => s.state === stateValue);
  const lgas: string[] = stateEntry?.lgas ?? [];

  return (
    <div className="space-y-10 w-full">
      {/* Profile & Campaign Images */}
      <div className="space-y-4">
        <SectionHeader icon={<ImageIcon className="w-4 h-4" />} title="Profile & Campaign Images" />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full">
          <Controller
            control={form.control}
            name="avatar"
            render={({ field, fieldState }) => (
              <ImageUploader
                value={field.value || ""}
                onChange={field.onChange}
                label="Profile Picture"
                description="Upload a professional headshot for your public profile."
                hint="Upload headshot — PNG or JPG"
                aspect="square"
              />
            )}
          />
          <Controller
            control={form.control}
            name="banner"
            render={({ field, fieldState }) => (
              <ImageUploader
                value={field.value || ""}
                onChange={field.onChange}
                label="Campaign Banner"
                description="A banner image for your campaign page."
                hint="Recommended 1200×400px — PNG or JPG"
                aspect="banner"
              />
            )}
          />
        </div>
      </div>

      {/* Full Name */}
      <div className="space-y-4 w-full">
        <SectionHeader icon={<User className="w-4 h-4" />} title="Full Name & Title" />
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-6 w-full">
          <Field className="sm:col-span-1 w-full">
            <FieldLabel>Title</FieldLabel>
            <FieldContent>
              <Select onValueChange={form.setValue} defaultValue={form.watch("title")}>
                <SelectTrigger>
                  <SelectValue placeholder="Select title" />
                </SelectTrigger>
                <SelectContent>
                  {TITLES.map((t) => (
                    <SelectItem key={t} value={t}>{t}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </FieldContent>
            <FieldDescription>Your preferred salutation.</FieldDescription>
            <FieldError />
          </Field>

          <Field className="sm:col-span-2 w-full">
            <FieldLabel>
              First Name <span className="text-destructive">*</span>
            </FieldLabel>
            <FieldContent>
              <Input placeholder="e.g. Ibrahim" {...form.register("firstName")} />
            </FieldContent>
            <FieldDescription>Your given name as it appears on official documents.</FieldDescription>
            <FieldError>{form.formState.errors.firstName?.message}</FieldError>
          </Field>

          <Field className="sm:col-span-1 w-full">
            <FieldLabel>Middle Name</FieldLabel>
            <FieldContent>
              <Input placeholder="Optional" {...form.register("middleName")} />
            </FieldContent>
            <FieldDescription>Your middle name, if any.</FieldDescription>
            <FieldError />
          </Field>

          <Field className="sm:col-span-2 w-full">
            <FieldLabel>
              Last Name <span className="text-destructive">*</span>
            </FieldLabel>
            <FieldContent>
              <Input placeholder="e.g. Sule" {...form.register("lastName")} />
            </FieldContent>
            <FieldDescription>Your family name or surname.</FieldDescription>
            <FieldError>{form.formState.errors.lastName?.message}</FieldError>
          </Field>
        </div>
      </div>

      {/* Personal Details */}
      <div className="space-y-4 w-full">
        <SectionHeader icon={<Calendar className="w-4 h-4" />} title="Personal Details" />
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-6 w-full">
          <Field className="sm:col-span-1 w-full">
            <FieldLabel>
              Age <span className="text-destructive">*</span>
            </FieldLabel>
            <FieldContent>
              <Input type="number" min={18} max={120} placeholder="52" {...form.register("age")} />
            </FieldContent>
            <FieldDescription>Must be at least 18 years old.</FieldDescription>
            <FieldError>{form.formState.errors.age?.message}</FieldError>
          </Field>

          <Field className="sm:col-span-2 w-full">
            <FieldLabel>
              Gender <span className="text-destructive">*</span>
            </FieldLabel>
            <FieldContent>
              <Select onValueChange={form.setValue} defaultValue={form.watch("gender")}>
                <SelectTrigger>
                  <SelectValue placeholder="Select gender" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Male">Male</SelectItem>
                  <SelectItem value="Female">Female</SelectItem>
                  <SelectItem value="Prefer not to say">Prefer not to say</SelectItem>
                </SelectContent>
              </Select>
            </FieldContent>
            <FieldDescription>Your gender identity.</FieldDescription>
            <FieldError>{form.formState.errors.gender?.message}</FieldError>
          </Field>

          <Field className="sm:col-span-3 w-full">
            <FieldLabel>
              Phone Number <span className="text-destructive">*</span>
            </FieldLabel>
            <FieldContent>
              <div className="flex rounded-md shadow-sm border border-input overflow-hidden focus-within:ring-1 focus-within:ring-ring">
                <span className="flex items-center px-3 bg-muted text-muted-foreground text-sm border-r border-input select-none shrink-0">
                  +234
                </span>
                <Input
                  placeholder="8012345678"
                  className="border-0 shadow-none focus-visible:ring-0 rounded-none"
                  {...form.register("phone")}
                />
              </div>
            </FieldContent>
            <FieldDescription>Your primary contact number (Nigeria mobile).</FieldDescription>
            <FieldError>{form.formState.errors.phone?.message}</FieldError>
          </Field>

          <Field className="sm:col-span-3 w-full">
            <FieldLabel>
              Email Address <span className="text-destructive">*</span>
            </FieldLabel>
            <FieldContent>
              <Input type="email" placeholder="name@example.com" {...form.register("email")} />
            </FieldContent>
            <FieldDescription>Your official email address for campaign communications.</FieldDescription>
            <FieldError>{form.formState.errors.email?.message}</FieldError>
          </Field>

          <Field className="sm:col-span-3 w-full">
            <FieldLabel>
              Highest Education <span className="text-destructive">*</span>
            </FieldLabel>
            <FieldContent>
              <Select onValueChange={form.setValue} defaultValue={form.watch("education")}>
                <SelectTrigger>
                  <SelectValue placeholder="Select qualification" />
                </SelectTrigger>
                <SelectContent>
                  {EDUCATION_LEVELS.map((e) => (
                    <SelectItem key={e} value={e}>{e}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </FieldContent>
            <FieldDescription>Your highest academic qualification attained.</FieldDescription>
            <FieldError>{form.formState.errors.education?.message}</FieldError>
          </Field>

          <Field className="sm:col-span-3 w-full">
            <FieldLabel>
              Occupation / Profession <span className="text-destructive">*</span>
            </FieldLabel>
            <FieldContent>
              <Input placeholder="e.g. Barrister & Solicitor" {...form.register("occupation")} />
            </FieldContent>
            <FieldDescription>Your current profession or primary occupation.</FieldDescription>
            <FieldError>{form.formState.errors.occupation?.message}</FieldError>
          </Field>
        </div>
      </div>

      {/* Location */}
      <div className="space-y-4 w-full">
        <SectionHeader icon={<MapPin className="w-4 h-4" />} title="State of Origin & Address" />
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-6 w-full">
          <Field className="sm:col-span-3 w-full">
            <FieldLabel>
              State of Origin <span className="text-destructive">*</span>
            </FieldLabel>
            <FieldContent>
              <Select
                onValueChange={(v) => {
                  form.setValue("state", v);
                  form.setValue("lga", "");
                }}
                defaultValue={form.watch("state")}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select your state of origin" />
                </SelectTrigger>
                <SelectContent className="max-h-60">
                  {statesData.map((s) => (
                    <SelectItem key={s.state} value={s.state}>{s.state}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </FieldContent>
            <FieldDescription>The state where you trace your origin.</FieldDescription>
            <FieldError>{form.formState.errors.state?.message}</FieldError>
          </Field>

          <Field className="sm:col-span-3 w-full">
            <FieldLabel>
              LGA of Origin <span className="text-destructive">*</span>
            </FieldLabel>
            <FieldContent>
              <Select
                onValueChange={(v) => form.setValue("lga", v)}
                defaultValue={form.watch("lga")}
                disabled={!stateValue}
              >
                <SelectTrigger>
                  <SelectValue placeholder={stateValue ? "Select your LGA of origin" : "Select state first"} />
                </SelectTrigger>
                <SelectContent className="max-h-60">
                  {lgas.map((l) => (
                    <SelectItem key={l} value={l}>{l}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </FieldContent>
            <FieldDescription>The Local Government Area where you originate from.</FieldDescription>
            <FieldError>{form.formState.errors.lga?.message}</FieldError>
          </Field>

          <Field className="sm:col-span-6 w-full">
            <FieldLabel>Residential Address</FieldLabel>
            <FieldContent>
              <Input placeholder="House number, street, city, state" {...form.register("address")} />
            </FieldContent>
            <FieldDescription>Your current residential address.</FieldDescription>
            <FieldError />
          </Field>
        </div>
      </div>

      {/* Bio */}
      <div className="space-y-4 w-full">
        <SectionHeader icon={<FileText className="w-4 h-4" />} title="Short Biography" />
        <Field className="w-full">
          <FieldLabel>
            About You <span className="text-destructive">*</span>
          </FieldLabel>
          <FieldContent>
            <Textarea
              rows={5}
              placeholder="Write a brief public biography — your background, achievements, community involvement, and motivation for seeking office..."
              {...form.register("bio")}
            />
          </FieldContent>
          <FieldDescription>
            Share your story with voters. {form.watch("bio")?.length || 0} / 600 characters recommended.
          </FieldDescription>
          <FieldError>{form.formState.errors.bio?.message}</FieldError>
        </Field>
      </div>
    </div>
  );
}

// ─── STEP 2: POLITICAL + PORTFOLIO + MANIFESTO ───────────────────────────────────

function Step2({ form }: { form: any }) {
  const [activeSector, setActiveSector] = useState<keyof z.infer<typeof manifestoSchema>>("economy");
  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "portfolio",
  });

  const contestingStateValue = form.watch("contestingState");
  const contestingEntry = statesData.find((s) => s.state === contestingStateValue);
  const contestingLgas: string[] = contestingEntry?.lgas ?? [];
  
  const manifesto = form.watch("manifesto") || {};
  const filledSectors = Object.values(manifesto).filter(Boolean).length;

  return (
    <div className="space-y-10 w-full">
      {/* Political Position */}
      <div className="space-y-4 w-full">
        <SectionHeader icon={<Landmark className="w-4 h-4" />} title="Political Position" />
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-6 w-full">
          <Field className="sm:col-span-3 w-full">
            <FieldLabel>
              Contesting Office <span className="text-destructive">*</span>
            </FieldLabel>
            <FieldContent>
              <Select onValueChange={form.setValue} defaultValue={form.watch("office")}>
                <SelectTrigger>
                  <SelectValue placeholder="Select the office you're contesting for" />
                </SelectTrigger>
                <SelectContent>
                  {OFFICES.map((o) => (
                    <SelectItem key={o} value={o}>{o}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </FieldContent>
            <FieldDescription>The political position you are seeking.</FieldDescription>
            <FieldError>{form.formState.errors.office?.message}</FieldError>
          </Field>

          <Field className="sm:col-span-3 w-full">
            <FieldLabel>
              Political Party <span className="text-destructive">*</span>
            </FieldLabel>
            <FieldContent>
              <Select onValueChange={form.setValue} defaultValue={form.watch("party")}>
                <SelectTrigger>
                  <SelectValue placeholder="Select your political party" />
                </SelectTrigger>
                <SelectContent>
                  {PARTIES.map((p) => (
                    <SelectItem key={p} value={p}>{p}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </FieldContent>
            <FieldDescription>The political party you are affiliated with.</FieldDescription>
            <FieldError>{form.formState.errors.party?.message}</FieldError>
          </Field>

          <Field className="sm:col-span-3 w-full">
            <FieldLabel>
              Constituency / State <span className="text-destructive">*</span>
            </FieldLabel>
            <FieldContent>
              <Select
                onValueChange={(v) => {
                  form.setValue("contestingState", v);
                  form.setValue("contestingLga", "");
                }}
                defaultValue={form.watch("contestingState")}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select your constituency state" />
                </SelectTrigger>
                <SelectContent className="max-h-60">
                  <SelectItem value="National">National (President / VP)</SelectItem>
                  {statesData.map((s) => (
                    <SelectItem key={s.state} value={s.state}>{s.state}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </FieldContent>
            <FieldDescription>The state or constituency you are contesting in.</FieldDescription>
            <FieldError>{form.formState.errors.contestingState?.message}</FieldError>
          </Field>

          <Field className="sm:col-span-3 w-full">
            <FieldLabel>LGA Constituency</FieldLabel>
            <FieldContent>
              <Select
                onValueChange={(v) => form.setValue("contestingLga", v)}
                defaultValue={form.watch("contestingLga")}
                disabled={!contestingStateValue || contestingStateValue === "National"}
              >
                <SelectTrigger>
                  <SelectValue
                    placeholder={
                      contestingStateValue === "National"
                        ? "N/A — National office"
                        : contestingStateValue
                        ? "Select your LGA constituency"
                        : "Select state first"
                    }
                  />
                </SelectTrigger>
                <SelectContent className="max-h-60">
                  {contestingLgas.map((l) => (
                    <SelectItem key={l} value={l}>{l}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </FieldContent>
            <FieldDescription>
              {contestingStateValue === "National" 
                ? "Not applicable for national offices." 
                : "The Local Government Area you are contesting in."}
            </FieldDescription>
            <FieldError />
          </Field>
        </div>
      </div>

      {/* Portfolio */}
      <div className="space-y-4 w-full">
        <div className="flex items-center justify-between border-b pb-2">
          <div className="flex items-center gap-2">
            <Briefcase className="w-4 h-4 text-muted-foreground" />
            <h3 className="text-sm font-semibold">Portfolio & Public Service</h3>
          </div>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => append({ title: "", period: "", description: "" })}
            disabled={fields.length >= 6}
            className="h-8 text-xs gap-1"
          >
            <Plus className="w-3.5 h-3.5" /> Add Role
          </Button>
        </div>

        <div className="space-y-4 w-full">
          {fields.map((field, idx) => (
            <div
              key={field.id}
              className="rounded-lg border bg-muted/30 p-4 space-y-4 w-full"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  Role {idx + 1}
                </span>
                {fields.length > 1 && (
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={() => remove(idx)}
                    className="h-7 w-7 text-destructive hover:text-destructive hover:bg-destructive/10"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </Button>
                )}
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-6 w-full">
                <Field className="sm:col-span-4 w-full">
                  <FieldLabel>
                    Position / Title <span className="text-destructive">*</span>
                  </FieldLabel>
                  <FieldContent>
                    <Input 
                      placeholder="e.g. Commissioner for Finance, Anambra State" 
                      {...form.register(`portfolio.${idx}.title`)}
                    />
                  </FieldContent>
                  <FieldDescription>Your official position or title held.</FieldDescription>
                  <FieldError />
                </Field>

                <Field className="sm:col-span-2 w-full">
                  <FieldLabel>
                    Period <span className="text-destructive">*</span>
                  </FieldLabel>
                  <FieldContent>
                    <Input 
                      placeholder="e.g. 2019 – 2023" 
                      {...form.register(`portfolio.${idx}.period`)}
                    />
                  </FieldContent>
                  <FieldDescription>Start and end dates of your service.</FieldDescription>
                  <FieldError />
                </Field>

                <Field className="sm:col-span-6 w-full">
                  <FieldLabel>
                    Key Achievement / Description <span className="text-destructive">*</span>
                  </FieldLabel>
                  <FieldContent>
                    <Textarea 
                      rows={2} 
                      placeholder="Describe your key achievement in this role..." 
                      {...form.register(`portfolio.${idx}.description`)}
                    />
                  </FieldContent>
                  <FieldDescription>Highlight your accomplishments and contributions.</FieldDescription>
                  <FieldError />
                </Field>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Manifesto */}
      <div className="space-y-4 w-full">
        <div className="flex items-center justify-between border-b pb-2">
          <div className="flex items-center gap-2">
            <FileText className="w-4 h-4 text-muted-foreground" />
            <h3 className="text-sm font-semibold">Manifesto by Sector</h3>
          </div>
          <Badge variant={filledSectors >= 8 ? "default" : "secondary"} className="text-xs">
            {filledSectors} / {MANIFESTO_SECTORS.length} filled
          </Badge>
        </div>

        {/* Sector pill tabs */}
        <div className="flex overflow-x-auto gap-2 pb-1 scrollbar-none">
          {MANIFESTO_SECTORS.map(({ key, label, icon }) => {
            const filled = !!manifesto[key];
            const active = activeSector === key;
            return (
              <button
                key={key}
                type="button"
                onClick={() => setActiveSector(key)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium whitespace-nowrap transition-colors border
                  ${active
                    ? "bg-primary text-primary-foreground border-primary"
                    : filled
                    ? "bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100"
                    : "bg-background text-muted-foreground border-input hover:bg-accent hover:text-accent-foreground"
                  }`}
              >
                {icon}
                {label}
                {filled && !active && (
                  <span className="ml-0.5 w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block" />
                )}
              </button>
            );
          })}
        </div>

        {/* Active sector input */}
        {MANIFESTO_SECTORS.map(({ key, label, placeholder, description }) =>
          activeSector === key ? (
            <motion.div
              key={key}
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              className="w-full"
            >
              <Field className="w-full">
                <FieldLabel>
                  {label} <span className="text-muted-foreground font-normal">— policy commitment</span>
                </FieldLabel>
                <FieldContent>
                  <Textarea rows={5} placeholder={placeholder} {...form.register(`manifesto.${key}`)} />
                </FieldContent>
                <FieldDescription>
                  {description} {form.watch(`manifesto.${key}`)?.length || 0} characters.
                </FieldDescription>
                <FieldError />
              </Field>
            </motion.div>
          ) : null
        )}
      </div>
    </div>
  );
}

// ─── STEP 3: PREVIEW + DISCLAIMER ───────────────────────────────────────────────

function Step3({
  form,
  agreed,
  onAgree,
}: {
  form: any;
  agreed: boolean;
  onAgree: (v: boolean) => void;
}) {
  const step1 = form.getValues();
  const fullName = [step1.title, step1.firstName, step1.middleName, step1.lastName]
    .filter(Boolean)
    .join(" ");

  const filledManifesto = MANIFESTO_SECTORS.filter((s) => step1.manifesto?.[s.key]);

  return (
    <div className="space-y-8 w-full">
      {/* Preview card */}
      <div className="rounded-lg border overflow-hidden w-full">
        {/* Banner */}
        {step1.banner ? (
          <div className="h-32 relative">
            <img src={step1.banner} alt="Campaign banner" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/30" />
          </div>
        ) : (
          <div className="h-32 bg-muted" />
        )}

        {/* Avatar + name */}
        <div className="bg-card px-6 pb-6">
          <div className="flex flex-col sm:flex-row items-start gap-4 -mt-10">
            {step1.avatar ? (
              <img
                src={step1.avatar}
                alt="Avatar"
                className="w-20 h-20 rounded-xl object-cover border-4 border-background shadow-sm z-10"
              />
            ) : (
              <div className="w-20 h-20 rounded-xl bg-muted border-4 border-background shadow-sm z-10 flex items-center justify-center">
                <User className="w-8 h-8 text-muted-foreground" />
              </div>
            )}
            <div className="pt-10 sm:pt-12 flex-1 space-y-1">
              <h2 className="text-lg font-semibold">{fullName || "—"}</h2>
              <p className="text-sm text-muted-foreground">
                {step1.office || "Office not set"} &mdash; {step1.party || "Party not set"}
                {step1.contestingState && step1.contestingState !== "National"
                  ? `, ${step1.contestingState}` : ""}
              </p>
              <div className="flex items-center gap-2 flex-wrap pt-1">
                {step1.party && <Badge>{step1.party}</Badge>}
                {step1.contestingState && (
                  <Badge variant="outline">{step1.contestingState}</Badge>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Personal summary */}
      <div className="space-y-4 w-full">
        <SectionHeader icon={<User className="w-4 h-4" />} title="Personal Information" />
        <dl className="grid grid-cols-1 gap-x-6 gap-y-3 sm:grid-cols-3 text-sm">
          {([
            ["Age", step1.age ? `${step1.age} years` : "—"],
            ["Gender", step1.gender || "—"],
            ["Education", step1.education || "—"],
            ["Occupation", step1.occupation || "—"],
            ["State of Origin", step1.state || "—"],
            ["LGA", step1.lga || "—"],
            ["Phone", step1.phone ? `+234 ${step1.phone}` : "—"],
            ["Email", step1.email || "—"],
          ] as [string, string][]).map(([label, value]) => (
            <div key={label} className="space-y-0.5">
              <dt className="text-xs text-muted-foreground font-medium">{label}</dt>
              <dd className="font-medium text-foreground">{value}</dd>
            </div>
          ))}
        </dl>
        {step1.bio && (
          <>
            <FieldSeparator />
            <p className="text-sm text-muted-foreground leading-relaxed">{step1.bio}</p>
          </>
        )}
      </div>

      {/* Portfolio summary */}
      {step1.portfolio?.some((p: any) => p.title) && (
        <div className="space-y-4 w-full">
          <SectionHeader icon={<Briefcase className="w-4 h-4" />} title="Portfolio & Service" />
          <div className="space-y-4">
            {step1.portfolio.filter((p: any) => p.title).map((item: any, idx: number) => (
              <div key={idx} className="border-l-2 border-primary pl-4 space-y-0.5">
                <p className="text-sm font-semibold">{item.title}</p>
                <p className="text-xs text-primary font-medium font-mono">{item.period}</p>
                <p className="text-sm text-muted-foreground leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Manifesto summary */}
      {filledManifesto.length > 0 && (
        <div className="space-y-4 w-full">
          <SectionHeader icon={<FileText className="w-4 h-4" />} title="Manifesto Commitments" />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {filledManifesto.map(({ key, label, icon }) => (
              <div key={key} className="rounded-lg border p-4 space-y-2">
                <p className="text-xs font-semibold text-primary flex items-center gap-1.5 uppercase tracking-wide">
                  {icon} {label}
                </p>
                <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3">
                  {step1.manifesto?.[key]}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* EULA */}
      <div className="rounded-lg border border-amber-200 bg-amber-50 p-5 space-y-4 w-full">
        <div className="flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
          <div>
            <h3 className="text-sm font-semibold text-amber-900">Declaration & End-User Agreement</h3>
            <p className="text-xs text-amber-700 mt-0.5">
              Please read the following carefully before submitting your profile.
            </p>
          </div>
        </div>

        <div className="rounded-md border border-amber-100 bg-white p-4 text-[12px] text-muted-foreground leading-relaxed space-y-3 max-h-52 overflow-y-auto">
          <p><strong className="text-foreground">1. Accuracy of Information.</strong> You declare that all information submitted in this form is true, accurate, complete, and not misleading. Submission of false or fabricated information may result in removal of your profile and referral to appropriate authorities.</p>
          <p><strong className="text-foreground">2. Consent to Publication.</strong> You consent to your profile, photograph, manifesto, and campaign materials being published publicly on this platform for civic engagement purposes.</p>
          <p><strong className="text-foreground">3. Platform Neutrality.</strong> This platform does not endorse, support, or campaign for any candidate, political party, or ideology. Publication of your profile does not constitute endorsement by the platform operators.</p>
          <p><strong className="text-foreground">4. INEC Compliance.</strong> You acknowledge that registration on this civic platform is independent of and does not substitute for official candidate registration with the Independent National Electoral Commission (INEC) of Nigeria.</p>
          <p><strong className="text-foreground">5. Manifesto Commitments.</strong> Policy positions submitted are solely your own and you take full responsibility for all published commitments.</p>
          <p><strong className="text-foreground">6. Right of Removal.</strong> The platform reserves the right to remove, suspend, or redact any profile that violates community guidelines, contains hate speech, incites violence, or breaches applicable Nigerian law.</p>
          <p><strong className="text-foreground">7. Data Privacy.</strong> Your personal information will be handled in accordance with Nigeria's Data Protection Act 2023 and will not be sold to third parties.</p>
        </div>

        <div className="flex items-start gap-3">
          <Checkbox
            id="agree"
            checked={agreed}
            onCheckedChange={(v) => onAgree(!!v)}
            className="mt-0.5"
          />
          <label htmlFor="agree" className="text-sm text-foreground leading-relaxed cursor-pointer">
            I have read and understood the Declaration and End-User Agreement. I confirm all information provided is accurate and I agree to the terms of this platform.
          </label>
        </div>
      </div>
    </div>
  );
}

// ─── ROOT ────────────────────────────────────────────────────────────────────────

export default function CandidateOnboardingForm() {
  const [step, setStep] = useState(1);
  const [agreed, setAgreed] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const form = useForm<Step1FormData & Step2FormData>({
    resolver: zodResolver(step1Schema.extend(step2Schema.shape)),
    defaultValues: EMPTY_STEP1,
  });

  // Load from localStorage
  useEffect(() => {
    try {
      const s1 = localStorage.getItem(STORAGE_KEY_STEP1);
      const s2 = localStorage.getItem(STORAGE_KEY_STEP2);
      const merged = { ...EMPTY_STEP1, ...EMPTY_STEP2 };
      if (s1) Object.assign(merged, JSON.parse(s1));
      if (s2) Object.assign(merged, JSON.parse(s2));
      form.reset(merged);
    } catch {
      // ignore
    }
  }, [form]);

  // Save to localStorage on change
  useEffect(() => {
    const subscription = form.watch((value) => {
      try {
        const { portfolio, manifesto, ...step1Data } = value;
        if (Object.keys(step1Data).some(k => step1Data[k as keyof typeof step1Data])) {
          localStorage.setItem(STORAGE_KEY_STEP1, JSON.stringify(step1Data));
        }
        if (portfolio || manifesto) {
          localStorage.setItem(STORAGE_KEY_STEP2, JSON.stringify({ portfolio, manifesto }));
        }
      } catch {}
    });
    return () => subscription.unsubscribe();
  }, [form]);

  const handleSubmit = form.handleSubmit((data) => {
    if (!agreed) return;
    const candidate = {
      id: `cand_${Date.now()}`,
      slug: `${data.firstName}-${data.lastName}`.toLowerCase().replace(/\s+/g, "-"),
      name: [data.title, data.firstName, data.middleName, data.lastName].filter(Boolean).join(" "),
      party: data.party,
      age: parseInt(data.age, 10),
      education: data.education,
      office: data.office,
      state: data.contestingState,
      lga: data.contestingLga,
      avatar: data.avatar,
      banner: data.banner,
      verified: false,
      followers: 0,
      endorsements: 0,
      portfolio: data.portfolio.filter((p) => p.title),
      manifesto: data.manifesto,
      bio: data.bio,
      phone: data.phone,
      email: data.email,
      occupation: data.occupation,
      stateOfOrigin: data.state,
      lgaOfOrigin: data.lga,
    };
    console.log("Candidate submitted:", candidate);
    try {
      localStorage.removeItem(STORAGE_KEY_STEP1);
      localStorage.removeItem(STORAGE_KEY_STEP2);
    } catch {}
    setSubmitted(true);
  });

  const handleReset = () => {
    setSubmitted(false);
    setStep(1);
    form.reset({ ...EMPTY_STEP1, ...EMPTY_STEP2 });
    setAgreed(false);
  };

  // Validate current step
  const validateStep = async (currentStep: number) => {
    const fields = currentStep === 1 
      ? Object.keys(step1Schema.shape)
      : Object.keys(step2Schema.shape);
    const result = await form.trigger(fields as any);
    return result;
  };

  const goToNextStep = async () => {
    if (step === 1) {
      const isValid = await validateStep(1);
      if (isValid) setStep(2);
    } else if (step === 2) {
      const isValid = await validateStep(2);
      if (isValid) setStep(3);
    }
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-muted/40 flex items-center justify-center p-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-card rounded-xl border p-10 text-center max-w-md shadow-sm space-y-4"
        >
          <div className="w-14 h-14 bg-emerald-50 rounded-full flex items-center justify-center mx-auto">
            <BadgeCheck className="w-7 h-7 text-emerald-600" />
          </div>
          <div>
            <h2 className="text-xl font-semibold">Profile Submitted</h2>
            <p className="text-sm text-muted-foreground mt-2 leading-relaxed">
              Your candidate profile has been submitted for review. Our moderation team
              will verify your information within 48–72 hours. You'll receive an email
              once your profile goes live.
            </p>
          </div>
          <Button onClick={handleReset} className="w-full">
            Submit Another Profile
          </Button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-muted/40 px-4 py-10">
      <div className="max-w-5xl space-y-6">
        {/* Page header */}
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Candidate Onboarding</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Register your civic profile — takes about 10 minutes.
          </p>
        </div>

        {/* Form card */}
        <div className="bg-card rounded-xl border shadow-sm p-6 sm:p-8">
          <StepIndicator current={step} />

          <form onSubmit={handleSubmit} className="space-y-0">
            <AnimatePresence mode="wait">
              {step === 1 && (
                <motion.div
                  key="step1"
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 16 }}
                  transition={{ duration: 0.18 }}
                  className="w-full"
                >
                  <div className="mb-8">
                    <h2 className="text-base font-semibold">Personal Biography</h2>
                    <p className="text-sm text-muted-foreground mt-0.5">
                      Your identity, contact, and public profile details.
                    </p>
                  </div>
                  <Step1 form={form} />
                </motion.div>
              )}

              {step === 2 && (
                <motion.div
                  key="step2"
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 16 }}
                  transition={{ duration: 0.18 }}
                  className="w-full"
                >
                  <div className="mb-8">
                    <h2 className="text-base font-semibold">Political Profile & Manifesto</h2>
                    <p className="text-sm text-muted-foreground mt-0.5">
                      Your office, party, public service record, and policy commitments.
                    </p>
                  </div>
                  <Step2 form={form} />
                </motion.div>
              )}

              {step === 3 && (
                <motion.div
                  key="step3"
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 16 }}
                  transition={{ duration: 0.18 }}
                  className="w-full"
                >
                  <div className="mb-8">
                    <h2 className="text-base font-semibold">Preview & Submit</h2>
                    <p className="text-sm text-muted-foreground mt-0.5">
                      Review your profile and accept the platform declaration before going live.
                    </p>
                  </div>
                  <Step3 form={form} agreed={agreed} onAgree={setAgreed} />
                </motion.div>
              )}
            </AnimatePresence>

            {/* Navigation */}
            <div className="flex items-center justify-between mt-10 pt-6 border-t">
              <Button
                type="button"
                variant="outline"
                onClick={() => setStep((s) => Math.max(1, s - 1))}
                disabled={step === 1}
              >
                <ChevronLeft className="w-4 h-4 mr-1" />
                Back
              </Button>

              {/* Dot progress */}
              <div className="flex items-center gap-1.5">
                {[1, 2, 3].map((n) => (
                  <div
                    key={n}
                    className={`rounded-full transition-all duration-200
                      ${step === n ? "w-5 h-2 bg-primary" : "w-2 h-2 bg-border"}`}
                  />
                ))}
              </div>

              {step < 3 ? (
                <Button type="button" onClick={goToNextStep}>
                  Continue
                  <ChevronRight className="w-4 h-4 ml-1" />
                </Button>
              ) : (
                <Button type="submit" disabled={!agreed}>
                  <BadgeCheck className="w-4 h-4 mr-1" />
                  Submit Profile
                </Button>
              )}
            </div>
          </form>
        </div>

        <p className="text-center text-xs text-muted-foreground">
          Your progress is saved automatically as a draft.
        </p>
      </div>
    </div>
  );
}


