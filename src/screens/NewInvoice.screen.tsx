import InvoiceForm from '@/components/templates/InvoiceForm';
import { useCreateInvoiceMutation, useInvoiceByIdQuery } from '@/hooks/api';
import { useUpdateInvoiceMutation } from '@/hooks/api/useUpdateInvoiceMutation';
import { RootStackParamList } from '@/navigation/App.navigator';
import { Invoice } from '@/types/invoice.type';
import { Product } from '@/types/product.type';
import { NavigationProp, RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { useCallback, useMemo } from 'react';
import { ActivityIndicator, StyleSheet } from 'react-native';

export type NewInvoiceFormData = {
  finalized?: boolean;
  paid?: boolean;
  customerId: string;
  date: Date;
  deadline: Date;
  invoiceLines: {
    product: Product;
    quantity: number;
  }[];
}

const InvoiceScreen = () => {
  const { reset } = useNavigation<NavigationProp<RootStackParamList>>();
  const { params } = useRoute<RouteProp<RootStackParamList, 'NewInvoice'>>();
  const { createInvoice, isPending: isCreating } = useCreateInvoiceMutation();
  const { updateInvoice, isPending: isUpdating } = useUpdateInvoiceMutation();

  const { invoice, isLoading } = useInvoiceByIdQuery(params?.id?.toString());

  const onSubmit = useCallback(async (data: NewInvoiceFormData) => {
    try {
      let result: Invoice;
      if (invoice) {
        result = (await updateInvoice({ invoice, newInvoice: data }))?.data;
      } else {
        result = (await createInvoice(data))?.data;
      }
      reset({
        routes: [
          { name: 'Home' },
          { name: 'Invoice', params: { id: result.id } }
        ]
      });
    } catch (error) {
      console.log(error);
    }
  }, [createInvoice, reset, invoice, updateInvoice]);

  const defaultValues = useMemo(() => {
    if (isLoading) return undefined;
    if (invoice) return {
      customerId: invoice.customer_id?.toString() ?? '',
      date: invoice.date ? new Date(invoice.date) : new Date(),
      deadline: invoice.deadline ? new Date(invoice.deadline) : new Date(new Date().setDate(new Date().getDate() + 30)),
      invoiceLines: invoice.invoice_lines.map((invoiceLine) => ({
        product: invoiceLine.product,
        quantity: invoiceLine.quantity,
      })),
    };
    return undefined;
  }, [invoice, isLoading]);

  if (isLoading) return <ActivityIndicator />;

  return (
    <InvoiceForm
      onSubmit={onSubmit}
      defaultValues={defaultValues}
      submitLabel={invoice ? "Save" : "Create"}
      submitDisabled={isCreating || isUpdating}
    />
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
