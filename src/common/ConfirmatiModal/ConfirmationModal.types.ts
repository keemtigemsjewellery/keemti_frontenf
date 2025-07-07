export type ConfirmationTypeProp = {
    modalId: string,
    title: string,
    cancelButtonText?: string,
    confirmationButtonText?: string,
    onConfirm: () => void,
    onCancel?: () => void

}