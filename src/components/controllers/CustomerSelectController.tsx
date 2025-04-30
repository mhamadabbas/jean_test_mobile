import { useController, UseControllerProps } from "react-hook-form";
import CustomerSelect from "../inputs/CustomerSelect";

type Props = UseControllerProps;

const CustomerSelectController = ({ name, control }: Props) => {
    const { field, fieldState } = useController({ name, control });

    return <CustomerSelect value={field.value} onChange={field.onChange} error={fieldState.error?.message} />;
}

export default CustomerSelectController;