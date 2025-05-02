import { InvoiceLineCard } from '@/components/cards';
import { DatePickerController } from '@/components/controllers';
import CustomerSelectController from '@/components/controllers/CustomerSelectController';
import AddProductSheet from '@/components/sheets/AddProductSheet';
import { Product } from '@/types/product.type';
import { Fragment, useState } from 'react';
import { FieldErrors, useForm } from 'react-hook-form';
import { ScrollView, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Button, Text } from 'tamagui';

export type NewInvoiceFormData = {
    customerId: string;
    date: Date;
    deadline: Date;
    invoiceLines: {
        product: Product;
        quantity: number;
    }[];
}

const defaultEmptyValues: NewInvoiceFormData = {
    customerId: '',
    date: new Date(),
    deadline: new Date(new Date().setDate(new Date().getDate() + 30)),
    invoiceLines: [],
}

type Props = {
    submitLabel: string;
    submitDisabled?: boolean;
    onSubmit: (data: NewInvoiceFormData) => void;
    defaultValues?: NewInvoiceFormData;
}

const InvoiceForm = ({ submitLabel, onSubmit, defaultValues = defaultEmptyValues, submitDisabled }: Props) => {
    const { bottom } = useSafeAreaInsets();

    const [isAddProductSheetOpen, setIsAddProductSheetOpen] = useState(false);

    const { control, handleSubmit, setValue, watch, formState: { errors }, trigger, reset: resetForm } = useForm<NewInvoiceFormData>({
        defaultValues,
        mode: 'onChange',
        resolver: async (data: NewInvoiceFormData) => {
            const errors: FieldErrors<NewInvoiceFormData> = {};

            if (!data.customerId) errors.customerId = { message: 'Customer is required', type: 'required' };
            if (data.invoiceLines.length === 0) errors.invoiceLines = { message: 'At least one invoice line is required', type: 'required' };

            return { values: data, errors };
        },
    });

    const date = watch('date');
    const invoiceLines = watch('invoiceLines');

    const productIdToHide = invoiceLines.map((invoiceLine) => invoiceLine.product.id.toString());
    const minDeadlineDate = date ? new Date(new Date(date).setDate(new Date(date).getDate() + 30)) : undefined;

    const handleAddProduct = (product: Product, quantity: number) => {
        setValue('invoiceLines', [...invoiceLines, { product, quantity }]);
        trigger('invoiceLines');
        setIsAddProductSheetOpen(false);
    }

    const handleDeleteProduct = (productId: string) => {
        setValue('invoiceLines', invoiceLines.filter((invoiceLine) => invoiceLine.product.id.toString() !== productId));
        trigger('invoiceLines');
    }

    return (
        <Fragment>
            <ScrollView style={styles.container} contentContainerStyle={[styles.contentContainer, { paddingBottom: bottom }]}>
                <Text alignSelf="flex-start" fontSize={16} fontWeight="bold">Customer</Text>
                <CustomerSelectController name="customerId" control={control} />
                <Text alignSelf="flex-start" fontSize={16} fontWeight="bold">Date</Text>
                <DatePickerController name="date" control={control} minDate={new Date()} />
                <Text alignSelf="flex-start" fontSize={16} fontWeight="bold">Deadline</Text>
                <DatePickerController name="deadline" control={control} minDate={minDeadlineDate} />
                <Text alignSelf="flex-start" fontSize={16} fontWeight="bold">Invoice lines</Text>
                {invoiceLines.map((invoiceLine) => (
                    <InvoiceLineCard
                        key={invoiceLine.product.id}
                        quantity={invoiceLine.quantity}
                        productName={invoiceLine.product.label}
                        price={+invoiceLine.product.unit_price}
                        onDelete={() => handleDeleteProduct(invoiceLine.product.id.toString())}
                    />
                ))}
                <Button width="100%"
                    backgroundColor="$gray6"
                    onPress={() => setIsAddProductSheetOpen(true)}
                    borderColor={errors.invoiceLines ? '$red10' : '$borderColor'}>
                    Add product
                </Button>
                {!!errors.invoiceLines && <Text alignSelf="flex-start" color="$red10">{errors.invoiceLines.message}</Text>}
                <Button
                    width="100%"
                    color="white"
                    marginTop="auto"
                    disabled={submitDisabled}
                    backgroundColor="$blue10"
                    onPress={handleSubmit(onSubmit)}
                >
                    {submitLabel}
                </Button>
            </ScrollView>
            <AddProductSheet
                onSubmit={handleAddProduct}
                isOpen={isAddProductSheetOpen}
                productIdToHide={productIdToHide}
                setIsOpen={setIsAddProductSheetOpen}
            />
        </Fragment>
    );
};

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
    },
    contentContainer: {
        gap: 10,
        padding: 16,
        flexGrow: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
});

export default InvoiceForm;
