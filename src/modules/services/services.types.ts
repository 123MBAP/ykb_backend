export type CreateCategoryInput = {
    name: string;
};

export type CreateServiceInput = {
    categoryId: string;
    title: string;
    description?: string | null;
    basePrice: string;
    currency?: string;
    isPlatformOwned?: boolean;
};

export type UpdateServiceInput = Partial<CreateServiceInput>;

export type AddServiceImageInput = {
    url: string;
    publicId: string;
};
