import { ButtonWithConfirmSheet } from '@/components/buttons/ButtonWithConfirmSheet';
import { InvoiceDetailsCard, InvoiceLineCard } from '@/components/cards';
import { ConfirmSheet } from '@/components/sheets';
import { ErrorBoundary } from '@/components/templates';
import { useDeleteInvoiceMutation } from '@/hooks/api/useDeleteInvoiceMutation';
import { useInvoiceByIdQuery } from '@/hooks/api/useInvoiceByIdQuery';
import { useUpdateInvoiceMutation } from '@/hooks/api/useUpdateInvoiceMutation';
import { RootStackParamList } from "@/navigation/App.navigator";
import { NavigationProp, RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { Fragment, useState } from 'react';
import { ActivityIndicator, ScrollView, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Button, Text } from 'tamagui';

const InvoiceScreen = () => {
  const { bottom } = useSafeAreaInsets();
  const { params } = useRoute<RouteProp<RootStackParamList, 'Invoice'>>();
  const { navigate } = useNavigation<NavigationProp<RootStackParamList>>();
  const { updateInvoice, isPending: isUpdating } = useUpdateInvoiceMutation();
  const { deleteInvoice, isPending: isDeleting } = useDeleteInvoiceMutation(params?.id);
  const { invoice, isLoading, isError, refetch } = useInvoiceByIdQuery(params?.id?.toString());

  const handleUpdatePress = () => {
    navigate('NewInvoice', { id: params?.id });
  }

  const handleMarkPaidConfirm = async () => {
    try {
      if (!invoice) throw new Error('Invoice not found');

      await updateInvoice({ invoice, newInvoice: { paid: true } });
    } catch (error) {
      console.error(error);
    }
  }

  const handleFinalizeInvoice = async () => {
    try {
      if (!invoice) throw new Error('Invoice not found');

      await updateInvoice({ invoice, newInvoice: { finalized: true } });
    } catch (error) {
      console.error(error);
    }
  }

  const handleDeleteConfirm = async () => {
    try {
      await deleteInvoice();
      navigate('Home');
    } catch (error) {
      console.error(error);
    }
  }

  if (isLoading) return <ActivityIndicator />;

  if (isError) return <ErrorBoundary title="Error loading invoice" />;

  if (!invoice || !params?.id) return <ErrorBoundary title="Invoice not found" />;

  return (
    <Fragment>
      <ScrollView style={styles.container} contentContainerStyle={[styles.contentContainer, { paddingBottom: bottom }]}>
        <Text alignSelf='flex-start' fontSize={24} fontWeight={800}>Invoice infos</Text>
        <InvoiceDetailsCard invoice={invoice} />
        <Text alignSelf='flex-start' fontSize={24} fontWeight={800}>Invoice lines</Text>
        {invoice.invoice_lines.map((invoiceLine) => (
          <InvoiceLineCard
            key={invoiceLine.product.id}
            quantity={invoiceLine.quantity}
            productName={invoiceLine.product.label}
            price={+invoiceLine.product.unit_price}
          />
        ))}
        {!invoice.finalized && <ButtonWithConfirmSheet
          width="100%"
          color="white"
          disabled={isUpdating}
          title="Finalize invoice"
          backgroundColor="$blue10"
          onConfirm={handleFinalizeInvoice}
          description="Are you sure you want to mark this invoice as finalized? The invoice cannot be updated after it is finalized."
        />}
        {!invoice.paid && invoice.finalized && <ButtonWithConfirmSheet
          width="100%"
          color="white"
          disabled={isUpdating}
          backgroundColor="$green10"
          title="Mark invoice as paid"
          onConfirm={handleMarkPaidConfirm}
          description="Are you sure you want to mark this invoice as paid? This action cannot be undone."
        />}
        {!invoice.finalized && <Button width="100%" backgroundColor="$blue10" color="white" onPress={handleUpdatePress}>Update</Button>}
        {!invoice.finalized && <ButtonWithConfirmSheet
          width="100%"
          color="white"
          disabled={isDeleting}
          title="Delete invoice"
          backgroundColor="$red10"
          onConfirm={handleDeleteConfirm}
          description="Are you sure you want to delete this invoice? This action cannot be undone."
        />}
      </ScrollView>
    </Fragment>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    gap: 10,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default InvoiceScreen;
