import { ErrorBoundary } from '@/components/templates';
import { useInvoiceByIdQuery } from '@/hooks/api/useInvoiceByIdQuery';
import { RootStackParamList } from "@/navigation/App.navigator";
import { RouteProp, useRoute } from '@react-navigation/native';
import { ActivityIndicator, ScrollView, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Button, ListItem, Text, YGroup } from 'tamagui';
import { formatDate } from 'utils/data';
import { getInvoiceStatus } from 'utils/invoice';

const InvoiceScreen = () => {
  const { bottom } = useSafeAreaInsets();
  const { params } = useRoute<RouteProp<RootStackParamList, 'Invoice'>>();
  const { invoice, isLoading, isError, refetch } = useInvoiceByIdQuery(params?.id?.toString());

  if (isLoading) return <ActivityIndicator />;

  if (isError) return <ErrorBoundary title="Error loading invoice" />;

  if (!invoice || !params?.id) return <ErrorBoundary title="Invoice not found" />;

  return (
    <ScrollView style={styles.container} contentContainerStyle={[styles.contentContainer, { paddingBottom: bottom }]}>
      <YGroup alignSelf='center' bordered borderWidth={1} borderColor="$gray9Light">
        <Text fontSize={24} fontWeight={800} backgroundColor="$gray2" padding={16}>Invoice infos</Text>
        <ListItem title="Invoice ID" subTitle={invoice.id?.toString()} />
        <ListItem title="Status" subTitle={getInvoiceStatus(invoice)} />
        <ListItem title="Customer ID" subTitle={invoice.customer_id?.toString()} />
        {!!invoice.date && <ListItem title="Billing date" subTitle={formatDate(invoice.date)} />}
        {!!invoice.deadline && <ListItem title="Due date" subTitle={formatDate(invoice.deadline)} />}
      </YGroup>
      <Button width="100%" backgroundColor="$red10" color="white">Delete</Button>
      <Button width="100%" backgroundColor="$blue10" color="white">Update</Button>
    </ScrollView>
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
