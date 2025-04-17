import {
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/common/form'
import { Input } from '@/components/ui/common/input'
import { FieldPath, FieldValues, UseFormReturn } from 'react-hook-form'

interface EmailFieldProps<
    TFieldValues extends FieldValues = FieldValues,
    TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> {
    form: UseFormReturn<TFieldValues>
    name: TName
    label: string
    placeholder?: string
    description?: string
    disabled?: boolean
    shouldShowErrors?: boolean
    autoComplete?: string
}

export function EmailField<
    TFieldValues extends FieldValues = FieldValues,
    TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
    form,
    name,
    label,
    placeholder = 'nostylist@gmail.com',
    description,
    disabled,
    shouldShowErrors,
    autoComplete = 'email',
}: EmailFieldProps<TFieldValues, TName>) {
    return (
        <FormField
            control={form.control}
            name={name}
            render={({ field }) => (
                <FormItem className='space-y-1.5'>
                    <FormLabel>{label}</FormLabel>
                    <FormControl>
                        <Input
                            type='email'
                            placeholder={placeholder}
                            disabled={disabled}
                            autoComplete={autoComplete}
                            {...field}
                        />
                    </FormControl>
                    {description && (
                        <FormDescription>{description}</FormDescription>
                    )}
                    {shouldShowErrors && (
                        <div className='h-3.5 md:h-1'>
                            <FormMessage className='text-xs' />
                        </div>
                    )}
                </FormItem>
            )}
        />
    )
}
