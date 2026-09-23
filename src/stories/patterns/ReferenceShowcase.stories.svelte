<script module>
  import { defineMeta } from "@storybook/addon-svelte-csf";
  import Button from "../../lib/components/Button/Button.svelte";
  import Checkbox from "../../lib/components/Toggle/Checkbox.svelte";
  import Radio from "../../lib/components/Toggle/Radio.svelte";
  import Switch from "../../lib/components/Toggle/Switch.svelte";
  import Input from "../../lib/components/Input/Input.svelte";
  import Textarea from "../../lib/components/Input/Textarea.svelte";
  import Field from "../../lib/components/Field/Field.svelte";
  import Dropdown from "../../lib/components/Select/Dropdown.svelte";
  import MultiSelect from "../../lib/components/Select/MultiSelect.svelte";
  import CurrencyInput from "../../lib/components/CurrencyInput/CurrencyInput.svelte";
  import PhoneInput from "../../lib/components/PhoneInput/PhoneInput.svelte";
  import FileUpload from "../../lib/components/Dropzone/FileUpload.svelte";
  import NumberInput from "../../lib/components/NumberInput/NumberInput.svelte";
  import SegmentedControl from "../../lib/components/Segmented/SegmentedControl.svelte";
  import OtpInput from "../../lib/components/PinInput/OtpInput.svelte";

  const { Story } = defineMeta({
    title: "Patterns/Reference Showcase",
    parameters: {
      layout: "padded",
      docs: {
        description: {
          component:
            "Pixel-faithful reproduction of the design reference showcasing all refined controls and newly added components: buttons, radials, checks, toggles, badges, dropdowns, badges with images, OTP, input field variants, text box, file upload, and numbers."
        }
      }
    }
  });

  // State
  let categories = $state(["auto", "food"]);
  let tags = $state(["design-system", "ui-kit"]);
  let selectedUser = $state("jane");
  let selectedCountry = $state("uz");
  let password = $state("");
  let selectedTeammates = $state(["jack", "ann"]);
  let selectedCategory = $state("marketing");
  let message = $state("");

  let paymentMethod = $state("paypal");
  let freeCancellation = $state(true);
  let newsletter = $state(true);
  let username = $state("");
  let website = $state("");
  let search = $state("");
  let currencyValue = $state(null);
  let currency = $state("USD");
  let phone = $state("");
  let phoneCountry = $state("US");
  let files = $state([]);
  let num1 = $state(1);
  let num2 = $state(2);
  let num3 = $state(1);
  let timeRange = $state("15M");
  let otpValue = $state("4853");

  const categoryOptions = [
    { value: "auto", label: "Auto", icon: "car" },
    { value: "food", label: "Food", icon: "pizza" },
    { value: "travel", label: "Travel", icon: "globe" }
  ];

  const tagOptions = [
    { value: "design-system", label: "Design System", tone: "accent", variant: "soft" },
    { value: "ui-kit", label: "UI Kit", tone: "accent", variant: "soft" },
    { value: "svelte", label: "Svelte 5", tone: "accent", variant: "soft" }
  ];

  const userOptions = [
    {
      value: "jane",
      label: "Jane Brown",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80"
    },
    {
      value: "jack",
      label: "Jack",
      avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&auto=format&fit=crop&q=80"
    }
  ];

  const countryOptions = [
    { value: "uz", label: "Uzbekistan (+998)", flag: "🇺🇿" },
    { value: "us", label: "United States (+1)", flag: "🇺🇸" },
    { value: "pt", label: "Portugal (+351)", flag: "🇵🇹" }
  ];

  const teammateOptions = [
    {
      value: "jack",
      label: "Jack",
      avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&auto=format&fit=crop&q=80",
      variant: "surface",
      pill: false
    },
    {
      value: "ann",
      label: "Ann",
      avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=100&auto=format&fit=crop&q=80",
      variant: "surface",
      pill: false
    },
    {
      value: "sienna",
      label: "Sienna",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80",
      variant: "surface",
      pill: false
    }
  ];

  const catOptions = [
    { value: "marketing", label: "Marketing", icon: "megaphone" },
    { value: "design", label: "Design", icon: "pencil" },
    { value: "dev", label: "Development", icon: "grid" }
  ];
</script>

<Story name="Complete Reference Suite">
  <div class="reference-grid">
    <!-- LEFT COLUMN -->
    <div class="column">
      <!-- 1. Categories (Solid Blue Badges with Icons) -->
      <Field label="Categories">
        {#snippet control({ id })}
          <MultiSelect
            {id}
            options={categoryOptions}
            bind:value={categories}
            tagTone="accent"
            tagVariant="solid"
          />
        {/snippet}
      </Field>

      <!-- 2. Tags with Info icon (Soft Outline Blue Badges) -->
      <Field label="Tags" info="Applied category tags">
        {#snippet control({ id })}
          <MultiSelect
            {id}
            options={tagOptions}
            bind:value={tags}
            tagTone="accent"
            tagVariant="soft"
          />
        {/snippet}
      </Field>

      <!-- 3. User Dropdown with Avatar -->
      <Field label="User">
        {#snippet control({ id })}
          <Dropdown
            {id}
            options={userOptions}
            bind:value={selectedUser}
          />
        {/snippet}
      </Field>

      <!-- 4. Country Dropdown with Flag -->
      <Field label="Country">
        {#snippet control({ id })}
          <Dropdown
            {id}
            options={countryOptions}
            bind:value={selectedCountry}
          />
        {/snippet}
      </Field>

      <!-- 5. Password with Reveal Eye Toggle and Helper -->
      <Field label="Password" hint="Must be at least 8 characters">
        {#snippet control({ id })}
          <Input
            {id}
            type="password"
            placeholder="Your password"
            bind:value={password}
            revealable
          />
        {/snippet}
      </Field>

      <!-- 6. Users MultiSelect with Avatar Badges & Helper -->
      <Field label="Users" hint="Select up to 3 users.">
        {#snippet control({ id })}
          <MultiSelect
            {id}
            options={teammateOptions}
            bind:value={selectedTeammates}
            placeholder="Select user(s)..."
            max={3}
            tagVariant="surface"
            tagPill={false}
          />
        {/snippet}
      </Field>

      <!-- 7. Category with Megaphone Icon and Info -->
      <Field label="Category" info="Category selector" hint="Select category for next step">
        {#snippet control({ id })}
          <Dropdown
            {id}
            options={catOptions}
            bind:value={selectedCategory}
          />
        {/snippet}
      </Field>

      <!-- 8. Message with Info and Character Hint -->
      <Field label="Message" info="Message field" hint="No more than 200 characters.">
        {#snippet control({ id })}
          <Textarea
            {id}
            placeholder="Your message..."
            bind:value={message}
            maxLength={200}
          />
        {/snippet}
      </Field>
    </div>

    <!-- RIGHT COLUMN -->
    <div class="column">
      <!-- 1. Radials (Radio Buttons) -->
      <div class="radios-group">
        <Radio
          name="payment"
          value="paypal"
          bind:group={paymentMethod}
          label="Paypal"
        />
        <Radio
          name="payment"
          value="bank"
          bind:group={paymentMethod}
          label="Bank Card"
        />
      </div>

      <!-- 2. Toggles (Switch) -->
      <div class="switch-row">
        <Switch
          bind:checked={freeCancellation}
          label="Free Cancellation"
          description="Any time without charges"
        />
      </div>

      <!-- 3. Checks (Checkbox) -->
      <div class="checkbox-row">
        <Checkbox
          bind:checked={newsletter}
          label="Subscribe to newsletter"
          description="Notifications only about new products and updates"
        />
      </div>

      <!-- 4. Plain Input Field -->
      <Input
        placeholder="Username"
        bind:value={username}
      />

      <!-- 5. Prefix Input Field (http://) -->
      <Input
        prefix="http://"
        placeholder="yoursite.com"
        bind:value={website}
      />

      <!-- 6. Search Input Field with Shortcut (⌘S) -->
      <Input
        icon="search"
        placeholder="Search..."
        shortcut="⌘S"
        bind:value={search}
      />

      <!-- 7. Currency / Price Input ($ 0.00 USD) -->
      <CurrencyInput
        bind:value={currencyValue}
        bind:currency
      />

      <!-- 8. Phone Number Input (🇺🇸 US +1 | Phone number) -->
      <PhoneInput
        bind:value={phone}
        bind:country={phoneCountry}
      />

      <!-- 9. File Upload (📎 Drop file(s) here... [Browse]) -->
      <FileUpload
        bind:files
        placeholder="Drop file(s) here..."
        browseLabel="Browse"
      />

      <!-- 10. Numbers / Steppers (3 Side-by-Side Styles) -->
      <div class="steppers-row">
        <NumberInput
          bind:value={num1}
          variant="controls-end"
        />
        <NumberInput
          bind:value={num2}
          variant="vertical"
        />
        <NumberInput
          bind:value={num3}
          variant="attached"
        />
      </div>

      <!-- 11. Segmented Control Pills (15M 30M 1H 4H 1D) -->
      <div class="segmented-row">
        <SegmentedControl
          items={["15M", "30M", "1H", "4H", "1D"]}
          bind:value={timeRange}
          pill
        />
      </div>

      <!-- 12. OTP Input (4 8 5 · 3 [glow] [ ]) -->
      <div class="otp-row">
        <OtpInput
          bind:value={otpValue}
          length={6}
          separatorAfter={3}
          focusIndex={4}
        />
      </div>

      <!-- 13. Buttons (Accept, Cancel) -->
      <div class="buttons-row">
        <Button variant="solid" tone="accent">Accept</Button>
        <Button variant="secondary">Cancel</Button>
      </div>
    </div>
  </div>
</Story>

<style>
  .reference-grid {
    display: grid;
    grid-template-columns: minmax(320px, 420px) minmax(320px, 420px);
    gap: 48px 64px;
    align-items: start;
    padding: 40px;
    max-width: 960px;
    margin: 0 auto;
    background: var(--ui-bg-canvas);
    border: 1px solid var(--ui-border-subtle);
    border-radius: var(--ui-radius-2xl);
    font-family: var(--ui-font-sans);
  }

  .column {
    display: flex;
    flex-direction: column;
    gap: 22px;
  }

  .radios-group {
    display: flex;
    flex-direction: column;
    gap: 12px;
  }

  .switch-row,
  .checkbox-row {
    display: flex;
    flex-direction: column;
  }

  .steppers-row {
    display: flex;
    align-items: center;
    gap: 16px;
    flex-wrap: wrap;
  }

  .segmented-row {
    display: flex;
    align-items: center;
  }

  .otp-row {
    display: flex;
    align-items: center;
  }

  .buttons-row {
    display: flex;
    align-items: center;
    gap: 12px;
  }
</style>
