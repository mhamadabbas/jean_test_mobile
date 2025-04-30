import { FC } from "react";
import { useController, UseControllerProps } from "react-hook-form";
import CustomerSelect from "../inputs/CustomerSelect";

type Props = UseControllerProps<any>;

const CustomerSelectController: FC<Props> = ({ name, control }) => {
    const { field, fieldState } = useController({ name, control });

    return <CustomerSelect value={field.value} onChange={field.onChange} error={fieldState.error?.message} />;
}

export default CustomerSelectController;