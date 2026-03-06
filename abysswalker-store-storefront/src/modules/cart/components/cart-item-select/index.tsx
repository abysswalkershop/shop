"use client"

import { IconBadge, clx } from "@medusajs/ui"
import {
  SelectHTMLAttributes,
  forwardRef,
  useImperativeHandle,
  useRef,
  useState,
} from "react"

import ChevronDown from "@modules/common/icons/chevron-down"

type NativeSelectProps = {
  placeholder?: string
  errors?: Record<string, unknown>
  touched?: Record<string, unknown>
} & Omit<SelectHTMLAttributes<HTMLSelectElement>, "size">

const CartItemSelect = forwardRef<HTMLSelectElement, NativeSelectProps>(
  (
    { placeholder = "Select...", className, children, onChange, value, defaultValue, ...props },
    ref
  ) => {
    const innerRef = useRef<HTMLSelectElement>(null)
    const [uncontrolledIsPlaceholder, setUncontrolledIsPlaceholder] = useState(() => {
      const initialValue = value ?? defaultValue
      return initialValue === "" || initialValue == null
    })
    const isPlaceholder =
      value !== undefined
        ? value === "" || value == null
        : uncontrolledIsPlaceholder

    useImperativeHandle<HTMLSelectElement | null, HTMLSelectElement | null>(
      ref,
      () => innerRef.current
    )

    return (
      <div>
        <IconBadge
          onFocus={() => innerRef.current?.focus()}
          onBlur={() => innerRef.current?.blur()}
          className={clx(
            "relative flex items-center txt-compact-small border text-ui-fg-base group",
            className,
            {
              "text-ui-fg-subtle": isPlaceholder,
            }
          )}
        >
          <select
            ref={innerRef}
            {...props}
            value={value}
            defaultValue={defaultValue}
            onChange={(event) => {
              setUncontrolledIsPlaceholder(event.target.value === "")
              onChange?.(event)
            }}
            className="appearance-none bg-abyss-background border-none px-4 transition-colors duration-150 focus:border-abyss-light-accent outline-none w-16 h-16 items-center justify-center"
          >
            <option disabled value="">
              {placeholder}
            </option>
            {children}
          </select>
          <span className="absolute flex pointer-events-none justify-end w-8 group-hover:animate-pulse">
            <ChevronDown />
          </span>
        </IconBadge>
      </div>
    )
  }
)

CartItemSelect.displayName = "CartItemSelect"

export default CartItemSelect
