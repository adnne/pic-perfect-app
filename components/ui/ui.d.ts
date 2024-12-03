declare namespace UI {
    type  ButtonProps = {
        title: string;
        onPress: () => void;
        style?: object;
        textStyle?: object;
        disabled?: boolean;
        loading?: boolean;
    }
}