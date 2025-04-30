import { DatePickerController } from '@/components/controllers';
import CustomerSelectController from '@/components/controllers/CustomerSelectController';
import { InvoiceLineCard } from '@/components/lists/InvoiceLinesList';
import AddProductSheet from '@/components/sheets/AddProductSheet';
import { useCreateInvoiceMutation } from '@/hooks/api';
import { RootStackParamList } from '@/navigation/App.navigator';
import { Product } from '@/types/product.type';
import { NavigationProp, useNavigation } from '@react-navigation/native';
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

const InvoiceScreen = () => {
  const { bottom } = useSafeAreaInsets();
  const { createInvoice, isPending } = useCreateInvoiceMutation();
  const { reset } = useNavigation<NavigationProp<RootStackParamList>>();

  const { control, handleSubmit, setValue, watch, formState: { errors }, trigger } = useForm<NewInvoiceFormData>({
    mode: 'onChange',
    defaultValues: {
      date: new Date(),
      deadline: new Date(new Date().setDate(new Date().getDate() + 30)),
      invoiceLines: [],
    },
    resolver: async (data: NewInvoiceFormData) => {
      const errors: FieldErrors<NewInvoiceFormData> = {};
      if (!data.customerId) errors.customerId = { message: 'Customer is required', type: 'required' };
      if (data.invoiceLines.length === 0) errors.invoiceLines = { message: 'At least one invoice line is required', type: 'required' };
      return {
        values: data,
        errors,
      };
    },
  });
  const [isAddProductSheetOpen, setIsAddProductSheetOpen] = useState(false);

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

  const onSubmit = async (data: NewInvoiceFormData) => {
    try {
      const { data: invoice } = await createInvoice(data);
      reset({
        routes: [
          { name: 'Home' },
          { name: 'Invoice', params: { id: invoice.id } }
        ]
      });
    } catch (error) {
      console.log(error);
    }
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
        <Button width="100%" backgroundColor="$blue10" color="white" marginTop="auto" onPress={handleSubmit(onSubmit)} disabled={isPending}>Save</Button>
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

export default InvoiceScreen;
