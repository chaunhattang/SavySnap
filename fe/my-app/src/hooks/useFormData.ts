export const buildFormData = (data: Record<string, any>) => {
    const formData = new FormData();

    Object.entries(data).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
            formData.append(key, value.toString());
        }
    });

    return formData;
};
