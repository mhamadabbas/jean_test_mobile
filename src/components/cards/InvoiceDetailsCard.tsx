import { Invoice } from '@/types/index'
import { FC, memo } from 'react'
import { Card, ListItem, YGroup } from 'tamagui'
import { formatDate } from 'utils/date'
import { getInvoiceStatus } from 'utils/invoice'
import { formatPrice } from 'utils/number'

type Props = {
    invoice: Invoice
}

export const InvoiceDetailsCard: FC<Props> = memo(({ invoice }) => {
    return (
        <YGroup
            bordered
            borderWidth={1}
            alignSelf="center"
            borderColor="$gray8Light"
        >
            <ListItem title="Invoice ID" subTitle={invoice.id?.toString()} />
            <ListItem title="Status" subTitle={getInvoiceStatus(invoice)} />
            <ListItem
                title="Customer ID"
                subTitle={invoice.customer_id?.toString()}
            />
            {!!invoice.date && (
                <ListItem title="Billing date" subTitle={formatDate(invoice.date)} />
            )}
            {!!invoice.deadline && (
                <ListItem title="Due date" subTitle={formatDate(invoice.deadline)} />
            )}
            {!!invoice.total && (
                <ListItem title="Amount" subTitle={formatPrice(invoice.total)} />
            )}
        </YGroup>
    )
})

InvoiceDetailsCard.displayName = 'InvoiceDetailsCard'
