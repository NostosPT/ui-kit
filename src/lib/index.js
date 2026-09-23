/**
 * Public surface of the kit.
 *
 * Import the stylesheet once, anywhere in your app:
 *   import "@nostos/ui/styles.css";
 *
 * Then put `class="ui-root"` on a wrapping element — that's what scopes the
 * base styles and establishes the token context. Set `data-ui-theme="dark"`
 * on the same element (or any ancestor) to flip the scheme.
 */

// --- primitives -------------------------------------------------------------
export { default as Icon } from "./components/Icon/Icon.svelte";
export { default as Button } from "./components/Button/Button.svelte";
export { default as ButtonGroup } from "./components/ButtonGroup/ButtonGroup.svelte";
export { default as Badge } from "./components/Badge/Badge.svelte";
export { default as Avatar } from "./components/Avatar/Avatar.svelte";
export { default as AvatarGroup } from "./components/Avatar/AvatarGroup.svelte";
export { default as Tag } from "./components/TagInput/Tag.svelte";
export { default as Kbd } from "./components/Kbd/Kbd.svelte";
export { default as Spinner } from "./components/Spinner/Spinner.svelte";
export { default as Divider } from "./components/Divider/Divider.svelte";
export { default as Skeleton } from "./components/Skeleton/Skeleton.svelte";
export { default as Trend } from "./components/Trend/Trend.svelte";
export { default as Price } from "./components/Price/Price.svelte";

// --- surfaces ---------------------------------------------------------------
export { default as Card } from "./components/Card/Card.svelte";
export { default as CardHeader } from "./components/Card/CardHeader.svelte";
export { default as CardBody } from "./components/Card/CardBody.svelte";
export { default as CardFooter } from "./components/Card/CardFooter.svelte";
export { default as Toolbar } from "./components/Toolbar/Toolbar.svelte";
export { default as Popover } from "./components/Popover/Popover.svelte";
export { default as Modal } from "./components/Modal/Modal.svelte";
export { default as Tooltip } from "./components/Tooltip/Tooltip.svelte";

// --- forms ------------------------------------------------------------------
export { default as Field } from "./components/Field/Field.svelte";
export { default as InputFrame } from "./components/Field/InputFrame.svelte";
export { default as Input } from "./components/Input/Input.svelte";
export { default as Textarea } from "./components/Textarea/Textarea.svelte";
export { default as TextBox } from "./components/Input/TextBox.svelte";
export { default as Select } from "./components/Select/Select.svelte";
export { default as Dropdown } from "./components/Select/Dropdown.svelte";
export { default as MultiSelect } from "./components/Select/MultiSelect.svelte";
export { default as Listbox } from "./components/Listbox/Listbox.svelte";
export { default as Checkbox } from "./components/Toggle/Checkbox.svelte";
export { default as Radio } from "./components/Toggle/Radio.svelte";
export { default as Switch } from "./components/Toggle/Switch.svelte";
export { default as SegmentedControl } from "./components/Segmented/SegmentedControl.svelte";
export { default as NumberInput } from "./components/NumberInput/NumberInput.svelte";
export { default as TagInput } from "./components/TagInput/TagInput.svelte";
export { default as PhoneInput } from "./components/PhoneInput/PhoneInput.svelte";
export { default as CurrencyInput } from "./components/CurrencyInput/CurrencyInput.svelte";
export { default as Dropzone } from "./components/Dropzone/Dropzone.svelte";
export { default as FileUpload } from "./components/Dropzone/FileUpload.svelte";
export { default as PinInput } from "./components/PinInput/PinInput.svelte";
export { default as OtpInput } from "./components/PinInput/OtpInput.svelte";
export { default as OptionCard } from "./components/OptionCard/OptionCard.svelte";
export { default as Calendar } from "./components/Calendar/Calendar.svelte";
export { default as DatePicker } from "./components/Calendar/DatePicker.svelte";

// --- data display -----------------------------------------------------------
export { default as List } from "./components/List/List.svelte";
export { default as ListItem } from "./components/List/ListItem.svelte";
export { default as Thumbnail } from "./components/List/Thumbnail.svelte";
export { default as Table } from "./components/Table/Table.svelte";
export { default as TableRow } from "./components/Table/TableRow.svelte";
export { default as TableCell } from "./components/Table/TableCell.svelte";
export { default as TableHeaderCell } from "./components/Table/TableHeaderCell.svelte";
export { default as Pagination } from "./components/Pagination/Pagination.svelte";
export { default as Progress } from "./components/Progress/Progress.svelte";
export { default as DataList } from "./components/DataList/DataList.svelte";
export { default as DataListRow } from "./components/DataList/DataListRow.svelte";
export { default as Stat } from "./components/Stat/Stat.svelte";
export { default as Sparkline } from "./components/Sparkline/Sparkline.svelte";
export { default as EmptyState } from "./components/EmptyState/EmptyState.svelte";

// --- navigation -------------------------------------------------------------
export { default as Sidebar } from "./components/Sidebar/Sidebar.svelte";
export { default as SidebarHeader } from "./components/Sidebar/SidebarHeader.svelte";
export { default as SidebarSearch } from "./components/Sidebar/SidebarSearch.svelte";
export { default as SidebarNav } from "./components/Sidebar/SidebarNav.svelte";
export { default as SidebarSection } from "./components/Sidebar/SidebarSection.svelte";
export { default as SidebarItem } from "./components/Sidebar/SidebarItem.svelte";
export { default as SidebarFooter } from "./components/Sidebar/SidebarFooter.svelte";
export { default as Tabs } from "./components/Tabs/Tabs.svelte";
export { default as TabPanel } from "./components/Tabs/TabPanel.svelte";
export { default as Menu } from "./components/Menu/Menu.svelte";
export { default as ContextMenu } from "./components/Menu/ContextMenu.svelte";
export { default as MenuItem } from "./components/Menu/MenuItem.svelte";
export { default as MenuSeparator } from "./components/Menu/MenuSeparator.svelte";
export { default as MenuLabel } from "./components/Menu/MenuLabel.svelte";
export { default as Breadcrumb } from "./components/Breadcrumb/Breadcrumb.svelte";
export { default as Accordion } from "./components/Accordion/Accordion.svelte";
export { default as AccordionItem } from "./components/Accordion/AccordionItem.svelte";

// --- feedback ---------------------------------------------------------------
export { default as Alert } from "./components/Alert/Alert.svelte";
export { default as Toaster } from "./components/Toast/Toaster.svelte";
export { toast, dismiss as dismissToast, dismissAll as dismissAllToasts } from "./components/Toast/toast.svelte.js";

// --- utilities --------------------------------------------------------------
export { icons, iconNames } from "./icons.js";
export { COUNTRIES, flagOf } from "./components/PhoneInput/countries.js";
export { cx, uid, clamp, initials, hashIndex } from "./internal/utils.js";
export { anchorPosition, trackAnchor, getContainingBlock } from "./internal/position.js";
export * as dateUtils from "./internal/date.js";
