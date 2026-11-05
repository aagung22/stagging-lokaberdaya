export type UserRole = 'user' | 'admin';

export type SiteSettings = Record<string, string | null>;

export type HeroSlide = {
    id: number;
    image_path: string;
    image_url: string | null;
    title: string | null;
    subtitle: string | null;
    sort_order: number;
    is_active: boolean;
};

export type ProgramStat = {
    id: number;
    program_id: number;
    label: string;
    value: string;
    icon: string | null;
    sort_order: number;
};

export type ProgramActivity = {
    id: number;
    program_id: number;
    city: string;
    category: string | null;
    image_path: string | null;
    image_url: string | null;
    detail_items: string[] | null;
    long_description: string | null;
    sort_order: number;
};

export type Program = {
    id: number;
    slug: string;
    title: string;
    page_title: string | null;
    short_description: string | null;
    hero_image: string | null;
    hero_image_url: string | null;
    hero_description: string | null;
    sort_order: number;
    is_active: boolean;
    stats?: ProgramStat[];
    stats_count?: number;
    activities?: ProgramActivity[];
    activities_count?: number;
};

export type UmkmRegionImage = {
    id: number;
    umkm_region_id: number;
    image_path: string;
    image_url: string | null;
    sort_order: number;
};

export type UmkmBeneficiary = {
    id: number;
    umkm_region_id: number;
    name: string;
    business: string;
    sort_order: number;
};

export type UmkmRegion = {
    id: number;
    city: string;
    description: string | null;
    sort_order: number;
    images: UmkmRegionImage[];
    beneficiaries: UmkmBeneficiary[];
    images_count?: number;
    beneficiaries_count?: number;
};

export type PostCategory = {
    id: number;
    name: string;
    slug: string;
    sort_order: number;
    posts_count?: number;
};

export type Post = {
    id: number;
    post_category_id: number | null;
    title: string;
    slug: string;
    author: string | null;
    published_at: string | null;
    excerpt: string | null;
    body: string | null;
    image_path: string | null;
    image_url: string | null;
    external_link: string | null;
    is_published: boolean;
    sort_order: number;
    category?: PostCategory | null;
};

export type Testimonial = {
    id: number;
    quote: string;
    name: string;
    role: string | null;
    photo_path: string | null;
    photo_url: string | null;
    sort_order: number;
    is_active: boolean;
};

export type Partner = {
    id: number;
    name: string;
    logo_path: string | null;
    logo_url: string | null;
    url: string | null;
    sort_order: number;
    is_active: boolean;
};

export type CoreValue = {
    id: number;
    title: string;
    description: string;
    icon: string | null;
    sort_order: number;
};

export type ContactMessage = {
    id: number;
    name: string;
    email: string;
    phone: string | null;
    subject: string | null;
    message: string;
    is_read: boolean;
    created_at: string;
};
