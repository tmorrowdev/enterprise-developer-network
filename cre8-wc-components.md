# Cre8 Web Components Library - JSDoc Documentation

> **Generated:** 2025-08-06T02:27:16.307Z
> **Total Entries:** 1168
> **Components:** 52
> **Properties:** 434

## Table of Contents

- [Cre8Accordion](#accordion)
- [Cre8AccordionItem](#accordionitem)
- [Cre8Alert](#alert)
- [Cre8Badge](#badge)
- [Cre8Breadcrumbs](#breadcrumbs)
- [Cre8Button](#button)
- [Cre8Card](#card)
- [Cre8CheckboxFieldItem](#checkboxfielditem)
- [Cre8DatePicker](#datepicker)
- [Cre8Divider](#divider)
- [Cre8Dropdown](#dropdown)
- [Cre8DropdownItem](#dropdownitem)
- [Cre8Field](#field)
- [Cre8FieldNote](#fieldnote)
- [Cre8Heading](#heading)
- [Cre8Icon](#icon)
- [Cre8InlineAlert](#inlinealert)
- [Cre8Link](#link)
- [Cre8LoadingSpinner](#loadingspinner)
- [Cre8Modal](#modal)
- [Cre8MultiSelect](#multiselect)
- [Cre8Pagination](#pagination)
- [Cre8PercentBar](#percentbar)
- [Cre8Popover](#popover)
- [Cre8ProgressMeter](#progressmeter)
- [Cre8ProgressSteps](#progresssteps)
- [Cre8ProgressStepsItem](#progressstepsitem)
- [Cre8RadioField](#radiofield)
- [Cre8RadioFieldItem](#radiofielditem)
- [Cre8Select](#select)
- [Cre8SkeletonLoader](#skeletonloader)
- [Cre8Tabs](#tabs)
- [Cre8Tag](#tag)
- [Cre8TagList](#taglist)
- [Cre8Tooltip](#tooltip)
- [Cre8Accordion](#accordion)
- [Cre8AccordionItem](#accordion-item)
- [Cre8Alert](#alert)
- [Cre8Badge](#badge)
- [Cre8Band](#band)
- [Cre8Breadcrumbs](#breadcrumbs)
- [Cre8BreadcrumbsItem](#breadcrumbs-item)
- [Cre8Button](#button)
- [Cre8ButtonGroup](#button-group)
- [Cre8Calendar](#calendar)
- [Cre8Card](#card)
- [Cre8CheckboxField](#checkbox-field)
- [Cre8CheckboxFieldItem](#checkbox-field-item)
- [Cre8Components](#components)
- [Cre8DangerButton](#danger-button)
- [Cre8DatePicker](#date-picker)
- [Cre8Divider](#divider)
- [Cre8Dropdown](#dropdown)
- [Cre8DropdownItem](#dropdown-item)
- [Cre8Feature](#feature)
- [Cre8Field](#field)
- [Cre8FieldNote](#field-note)
- [Cre8Footer](#footer)
- [Cre8GlobalNav](#global-nav)
- [Cre8GlobalNavItem](#global-nav-item)
- [Cre8Grid](#grid)
- [Cre8GridItem](#grid-item)
- [Cre8Header](#header)
- [Cre8Heading](#heading)
- [Cre8Hero](#hero)
- [Cre8Icon](#icon)
- [Cre8InlineAlert](#inline-alert)
- [Cre8Layout](#layout)
- [Cre8LayoutContainer](#layout-container)
- [Cre8LayoutSection](#layout-section)
- [Cre8LineLengthContainer](#linelength-container)
- [Cre8Link](#link)
- [Cre8LinkList](#link-list)
- [Cre8LinkListItem](#link-list-item)
- [Cre8List](#list)
- [Cre8ListItem](#list-item)
- [Cre8LoadingSpinner](#loading-spinner)
- [Cre8Logo](#logo)
- [Cre8Main](#main)
- [Cre8Modal](#modal)
- [Cre8MultiSelect](#multi-select)
- [Cre8NavContainer](#nav-container)
- [Cre8PageCounter](#page-counter)
- [Cre8PageHeader](#page-header)
- [Cre8Pagination](#pagination)
- [Cre8PercentBar](#percent-bar)
- [Cre8Popover](#popover)
- [Cre8PrimaryNav](#primary-nav)
- [Cre8PrimaryNavItem](#primary-nav-item)
- [Cre8ProgressMeter](#progress-meter)
- [Cre8ProgressStepsItem](#progress-steps-item)
- [Cre8RadioField](#radio-field)
- [Cre8RadioFieldItem](#radio-field-item)
- [Cre8RemoveTag](#remove-tag)
- [Cre8Section](#section)
- [Cre8Select](#select)
- [Cre8SelectTile](#select-tile)
- [Cre8SelectTileList](#select-tile-list)
- [Cre8SkeletonLoader](#skeleton-loader)
- [Cre8SplitButton](#split-button)
- [Cre8Submenu](#submenu)
- [Cre8SubmenuItem](#submenu-item)
- [Cre8Tab](#tab)
- [Cre8TabPanel](#tab-panel)
- [Cre8Table](#table)
- [Cre8TableBody](#table-body)
- [Cre8TableCell](#table-cell)
- [Cre8TableHeader](#table-header)
- [Cre8TableHeaderCell](#table-header-cell)
- [Cre8TableObject](#table-object)
- [Cre8TableRow](#table-row)
- [Cre8Tabs](#tabs)
- [Cre8Tag](#tag)
- [Cre8TagList](#tag-list)
- [Cre8TertiaryNav](#tertiary-nav)
- [Cre8TertiaryNavItem](#tertiary-nav-item)
- [Cre8TextLink](#text-link)
- [Cre8TextPassage](#text-passage)
- [Cre8Tooltip](#tooltip)
- [Cre8UtilityNav](#utility-nav)
- [Cre8UtilityNavItem](#utility-nav-item)

---

## Accordion

### Overview

The component is a vertically stacked list of headers that reveal or hide sections of related content on a page.
The header title gives the user a high level overview of the content allowing the user to decide
which sections to expand for the information.
Accordion contains Accordion Items as children. This component is the wrapper for grouping related accordion items.
Users can select different border types: default (no border), rectangle, rounded bottom, and rounded.

### File Location

`packages/cre8-react/src/components/Accordion/Accordion.tsx`

---

## AccordionItem

### Overview

The accordion item component delivers large amounts of content in a small space
through progressive disclosure. That is, the user gets key details about the
underlying content and can choose to expand that content within the constraints
of the accordion item. Accordion Items work especially well on mobile interfaces or
whenever vertical space is at a premium.

## HOW TO USE

Avoid “nested” accordion items—that is, collapsible content within collapsible
content. This type of pattern goes against UX best practices.
The Cre8 accordion item header allows for two sizes:
'sm' [Cre8-typography-title-default] or 'lg' [Cre8-typography-title-large]
A chevron is used to indicate the “expand/collapse” action, though the entire
header area is clickable for the same action.
**NOTE**: The header of the accordion item uses h tags so be sure to choose the headingTagVariant that
fits into the hierarchy of your html page layout. THIS WILL NOT CHANGE THE APPEARANCE OF THE HEADER.

### File Location

`packages/cre8-react/src/components/AccordionItem/AccordionItem.tsx`

---

## Alert

### Overview

The general purpose of an alert or notification is to draw the user’s attention
and provide the user with timely, relevant information.

## Alert Styles:

- There are 6 statuses for 6 types of alerts: 'error', 'info', 'notification', 'neutral', 'warning', 'success'.
  Each alert will have different icon to be displayed in the alert.
- Users can select two types of alert variants: 'standalone', or 'banner'.
- User can also choose the alert should be emphasized or not. There are two options: subtle or strong.
- User can add button or link in the alert.
  If users choose to emphasize the alert (**strong**), user needs to used **"inverted"** prop in button or link.
- User can choose whether the alert can be dismissed or not

### File Location

`packages/cre8-react/src/components/Alert/Alert.tsx`

---

## Badge

### Overview

Status badges are used most often in tables or fat rows in a list. These components serve a contextual purpose and don't provide any functionality.
Badges should be organized inside a dedicated table row communicating status such as pending, approved or rejected.

### File Location

`packages/cre8-react/src/components/Badge/Badge.tsx`

---

## Breadcrumbs

### Overview

The breadcrumbs component is a secondary navigation pattern that helps a user understand where the user is located.
The breadcrumbs component shows the users their current location relative to the information architecture
It enables the users to quickly move up to a parent level or previous location.

## How to Use

- Import 'Breadcrumbs' component.
- Add the pages in the path of the breadcrumbs using `Cre8-breadcrumbs-item`.
  All the pages in the breadcrumbs component should be interactive.
- All the page should link to their respective pages (except the current page) using `Cre8-link`.
- The current page is included in the breadcrumbs trail.
- The current page is always the last text listed and is not an interactive link.

### File Location

`packages/cre8-react/src/components/Breadcrumbs/Breadcrumbs.tsx`

---

## Button

### Overview

The size and state of buttons on the screen serve as visual cues for the user about what they can do and what they should do next. They indicate the availability and priority of the action on the page.

- Buttons are a single call-to-action where a single click performs that action
- Use buttons when you are performing an action which is almost always on the same page
- Use a link instead of a button when you're navigating to another place

## How to Use

Buttons are distinguished by three key properties:

- **Visual Priority**: Style and size: Primary, Secondary, or Tertiary styles; each with large and small variations
- **State**: Interaction state: hover/click (press), focus, disabled, and submitting/loading (only for large buttons)
- **Brand**: Styles determined by the site or component theme

### Usage Guidelines

Primary, Secondary and Tertiary styles emphasize or de-emphasize an action. They also define
background, font style, and border colors. Large and small sizing assists with visual priority by defining button
heights, left and right internal padding, and font-size.

#### System Feedback

Each button has a default and hover/click (press) state that give the user feedback
that they have successfully interacted with a button.
Button presses should always be combined with other types of timely system feedback.
Examples of system feedback may be a page refresh, exposing additional controls or content,
dialogs, alerts and notifications.
If there is perceived a delay in system response, generally due to technical constraints,
provide a progress or loading indicator.

#### Button Text

- Button text should be as short and simple as possible, ideally a maximum of 3 words.
- Use Title Case for readability.
- They should not include punctuation (exception: "Loading...").
- They should not be used as an indicator of what happens on the next page, or as a substitute
  for a progress meter.

#### Button With Icon

For button with icon:

- **iconRotateDegree** & **iconFlipDirection** props are optional.
- They are used to set up the correct dirrection for icons, for example,
  arrows, caret up or caret down.

#### Button Styling

- DO use only the styles of the brand you are working on.
- DO NOT combine styles, even if the page is co-branded.

#### Button Sizes

- DO always pair like sizes together and maintain the hierarchy of Primary and Secondary/Tertiary.
- DO NOT mix sizes of buttons when they are used together as a group.

#### Input Pairing

Primary and Secondary buttons may be paired with input fields.
Only one Primary button may appear on each screen.
Use the Secondary button when there are multiple in-context buttons
and/or when there is an emphasized page level button.
When used in a form context, the button's `type` needs to be `submit` to pass along form data.

- DO use only large buttons with input fields.
- DO NOT use small buttons with input fields.

### File Location

`packages/cre8-react/src/components/Button/Button.tsx`

---

## Card

### Overview

The card component acts a general container element for various content.

# How to Use

1. Wrap the card component tags around any html template code which has been properly imported into the file.
2. Decide the layout that best fits the designs assigned to your work. Generally, we recommend visual elements appear at the start with
   custom html content that gives further context and meaning following after.
3. The card defaults to a column and includes a `horizontal` directional variant. If you have a card where the layout of the content is
   more aligned horizontally, using the `horizontal` variant will ease the construction of your component
4. Finally, we typically recommend reserving the end of the card for any interactive elements such as buttons for navigating to further information.

### File Location

`packages/cre8-react/src/components/Card/Card.tsx`

---

## CheckboxFieldItem

### Overview

CheckboxFieldItem is the combination of Checkbox, Label and FieldNote. Checkbox can turn an option on or off.

### File Location

`packages/cre8-react/src/components/CheckboxFieldItem/CheckboxFieldItem.tsx`

---

## DatePicker

### Overview

The Date Picker component renders a form group with label, control, help text and validation styling much
like the Field component but exclusively for type=date.
Cre8DatePicker inherts the Cre8Field component.

### File Location

`packages/cre8-react/src/components/DatePicker/DatePicker.tsx`

---

## Divider

### Overview

The divider component is a separator between sections of content or groups of items.
It often contains a horizontal or vertical line.
##How to use

- By default, the component renders the **horizontal divider**
- The user can set variant === "vertical" so it will render the vertical divider
- By default, the divider has gray color.
- The user can set status === "brand" to set the divider to blue color.
- The user can set status === "knockout" to set the divider to white color.

### File Location

`packages/cre8-react/src/components/Divider/Divider.tsx`

---

## Dropdown

### Overview

The Dropdown menu itself is a container that can host multiple interactive items, commonly formatted as a list

### File Location

`packages/cre8-react/src/components/Dropdown/Dropdown.stories.tsx`

---

## DropdownItem

### Overview

The Dropdown item component is designed to be used with Dropdown component, each item represents a
selectable option or action within the dropdown menu. It can be configured to trigger actions, navigate
to links, initiate commands when clicked.

### File Location

`packages/cre8-react/src/components/DropdownItem/DropdownItem.tsx`

---

## Field

### Overview

The Field component renders a form group with label, control, help text and validation styling. There are
convenience variants of Field to support HTML5 input types and static content.

### File Location

`packages/cre8-react/src/components/Field/Field.tsx`

---

## FieldNote

### Overview

Field Note gives direction on how to fill out a form field and to alert users of form errors and successes.
It’s used below an input field and never on its own.

### File Location

`packages/cre8-react/src/components/FieldNote/FieldNote.tsx`

---

## Heading

### Overview

HTML headings are titles or subtitles that you want to display on a webpage. The H1 is the most important and H6
is the least important in the content hierarchy.

# How to Use

1. The Cre8-heading tag wraps around one of the six native HTML "h" tags, depending on your chosen variation.
2. There are two main use cases for using this component: text passage headings and Components with a title (i.e. modal, card or alert)
3. There will be instances when the design requires the heading text to have the brand color applied in which case you should set
   the [brandColor](?path=/story/Cre8-components-heading--brand-color) attribute to true on the Cre8-heading tag.
4. For dark backgrounds, add the [inverted](?path=/story/Cre8-components-heading--inverted) attribute to the tag for white text.

### File Location

`packages/cre8-react/src/components/Heading/Heading.tsx`

---

## Icon

### Overview

<Cre8-icon> is a web component, which can be used with any frontend framework and use any svg.
It takes raw svgs as props and renders them.
**'Cre8-icon-legacy'** will be **deprecated** in Web Components v0.5.0

- [List of new figma icons](https://www.figma.com/file/j1a0rBkoH65XiGKfq7ppWa/Iconography?type=design&node-id=2037-5773&mode=design&t=6ZzC6KH3Gkxf3fj5-4)
- The new `Cre8-icon` from the Cre8-icon package: https://static-dev.esi-memberweb-dev.aws.evernorthcloud.com/cre8-icons/.
  ##Usability Considerations
- If the icon is decorative: set `aria-hidden` to true.
- If the icon is interactive (not decorative): set `aria-hidden` to false and add the `aria-label`
- If the icon is key to functionality from a screen reader perspective, it is required to add `aria-label`
  which will describe the icon.
  For example, if the icon is a close button, setting `aria-label="Close"`will give
  the SVG an aria-label to make it sufficiently accessible.
  [More information on Accessibility with cre8-icons](https://static-dev.esi-memberweb-dev.aws.evernorthcloud.com/cre8-icons/?path=/story/getting-started-accessibility--page)
  ##How to use
  Cre8 Web Components (Cre8-wc) includes the `cre8_dev/cre8-icons` package.
  If you need to install a newer version than what's included, please see
  the [installation instructions for cre8-icons](https://git.express-scripts.com/ExpressScripts/cre8-icons#installation).
- Import the component (this is the icon container): `import '@cre8_dev/cre8-icons';`
- Import an svg as a string: `import svgInfo from '!!raw-loader!cre8_dev/cre8-icons/lib/icons/System/Regular/Info.svg';`
  Your import paths may be different depending on your project's build configuration.
  Please see [Importing Icons](https://static-dev.esi-memberweb-dev.aws.evernorthcloud.com/cre8-icons/?path=/story/icon-sets-importing-icons--page)
  of the `cre8_dev/cre8-icons` documentation for more information.

### File Location

`packages/cre8-react/src/components/Icon/Icon.tsx`

---

## InlineAlert

### Overview

In cases when it is necessary to alert the user but a less strong message that cannot be dismissed is desired, use an in-line contextual alert message as the least "severe" message type. These can be displayed anywhere on the page, but should never cover content.
Inline alerts do not include a title or close capability and are considered minimally intrusive user messaging.

### File Location

`packages/cre8-react/src/components/InlineAlert/InlineAlert.stories.tsx`

---

## Link

### Overview

Link Component are strictly used in the case where the component will take
the user away from the current page to a new url.
In this vein, this component should ONLY be used in situations an anchor tag would be used (an href is required)
This goes for the variations as well such as the Call To Action Link
**Note**
For link with icon:

- **iconRotateDegree** & **iconFlipDirection** props are optional.
- They are used to set up the correct dirrection for icons, for example,
  arrows, caret up or caret down.

### File Location

`packages/cre8-react/src/components/Link/Link.tsx`

---

## LoadingSpinner

### Overview

A loading spinner notifies the user that their request is being processed while the front end is retrieving data
or performing slow computations.
Providing visibility of a system's status is one of the most important rules of UI design. When the user has to
guess or assume that the system is responding to their input, they may send a command such as submit multiple
times, while also being anxious that the application is frozen or not working.
While it is most ideal to improve system performance such that there is no perceptible delay, in some cases this
is not possible. In these cases, the immediate response should be a progress indicator to give a visual indication
that their command was received and that the application is working.
The length of time for the system response is a good general guideline for which progress indicator to use.

## Determinable vs indeterminate progress

A progress meter provides feedback that the system is working and gives the user an indication of how much time
they will wait. This indicator should be used when the system response time is longer and determinable. See
ProgressMeter component for further examples and accessibility considerations.

## How to Use

The loading-spinner component can be used to indicate loading state on the component level all the way up to the
page level. There are two loading styles: determinate (loading progress represents percentage of total load time)
and indeterminate (a spinning animation that persists while loading continues)

1. Choose a size and use it according to context, guidance should be given by your design team.
2. If you choose to use the determinate loader then you must also control the progress attribute's value which
   controls the percentage of the circle that shows (values 0-100 accepted);
3. For dark backgrounds, add the `inverted` attribute to the `<Cre8-loading-spinner>` tag.
4. For accessibility reasons, always include a label input unless explicitly informed to do otherwise by design or
   accessibility teams.

### File Location

`packages/cre8-react/src/components/LoadingSpinner/LoadingSpinner.tsx`

---

## Modal

### File Location

`packages/cre8-react/src/components/Modal/Modal.tsx`

---

## MultiSelect

### Overview

Multiselect is used when multiple options can be chosen from a static dropdown
This component has a list of items in the dropdown that can be added as "selected tags"
The checkbox will always reflect the selected nature of the item and is not removed
from the dropdown when clicked, the tags will be added and removed based on their state.
Event `selectedItemsChange` emits whenever a tag is added or remove from the list and the
current list after the change is given in the detail.

### File Location

`packages/cre8-react/src/components/MultiSelect/MultiSelect.tsx`

---

## Pagination

### Overview

The Pagination component is used to split up a large amount of results by showing only
a certain amount on each page. You can cycle through the pages using Page Numbers,
Next and Previous Buttons, or optional First Page and Last Page Buttons.
This component is also used by Table to cycle through rows of results. Pagination has four display options:
**default**: Can contain up to seven Page Numbers (ellipses included) at a time flanked by
Next and Previous Buttons. When there are more than seven pages, numbers start getting
replaced by ellipses. Use this option when you have a lot of horizontal space in a layout.
It should not be used for mobile web layouts since its buttons are smaller than the minimum touch target of 44px.
**compact** : Best used as a summary of where you are among pages or table rows
flanked by Previous and Next Buttons. Use this option when you have limited horizontal
space but still need to show where users are among results. Great for mobile layouts.
**icon-only** : Use this option in very tight spaces when it’s not required
to show users where they are among results. Great for mobile layouts.

## HOW TO USE

Select an option from the “Display” dropdown depending on layout width
Select where your current page is from the “Page” dropdown
To show less pages when using Full Numbers, use the “pageNumber” toggles
To hide the First Page and Last Page Buttons, turn off the “firstLastButton” toggle
To change the states of page numbers or buttons, click on each to see its “State” dropdown
When using Compact Pagination, you can choose between “Page Numbers” and "Icon Only" formats

## ACCESSIBILITY NOTE

To best orient people using screen readers, push focus to the top of
the list of results after any of the pagination buttons have been triggered,
**except for the currently selected one**. Focus target could be a visual results heading,
or the top heading of the results container of the page selected
via a programmatic selector, e.g. < section id=“results” aria-label="results-section" > or
< div role= “group” aria-label=“results” >.

### File Location

`packages/cre8-react/src/components/Pagination/Pagination.tsx`

---

## PercentBar

### Overview

The percent bar visually indicates a user's current progress and has a few features: a basic display bar with
a percentage, an actionable icon that allows a user to revisit a prior step and an actionable link that
allows a user save their progress before exiting.

### File Location

`packages/cre8-react/src/components/PercentBar/PercentBar.tsx`

---

## Popover

### Overview

The Popover is for progressive disclosure of relevant content often hidden behind a help or info icon.
Its content should be no longer than 3-4 lines in addition to a line of heading text and an optional button.

### File Location

`packages/cre8-react/src/components/Popover/Popover.tsx`

---

## ProgressMeter

### Overview

A progress meter provides feedback that the system is working and gives the user an indication of how much time they will wait.
This indicator should be used when the system response time is longer and determinable.

# How to Use

1. Select a background from the “Surface” dropdown
2. Select completion amount from the “Progress” dropdown

### File Location

`packages/cre8-react/src/components/ProgressMeter/ProgressMeter.tsx`

---

## ProgressSteps

### Overview

The Progress Steps component is used to display where a user is in a multistep process.
It clearly indicates the total number of steps, which steps are complete and incomplete,
and which step you’re currently on. They help users estimate how long a task will take and can be
used to track status on orders.
The Progress Steps component should be used as a parent component for `Cre8-progress-steps-item` components.
These Components serve a contextual purpose and don't provide any functionality.

# How to Use

Progress Steps is used when there is ample horizontal space and two to six steps. It displays each step by name
and number to help users understand exactly where they are in a process. It is the preferred option for desktop.
Progress Steps should change to Compact Steps on mobile web to conserve space.
Progress Steps can also be used to track order status. It provides a quick visual of how an order is progressing
with options to alert users of any problems along the way. When used for order status, Progress Steps should
change to Vertical Steps on mobile web to conserve space while allowing alerts and messages to remain visible.

### File Location

`packages/cre8-react/src/components/ProgressSteps/ProgressSteps.tsx`

---

## ProgressStepsItem

### Overview

The Progress Steps Item component is used to display a single step in a multi-step process.
It should be used as a child component of `Cre8-progress-steps`.
These Components serve a contextual purpose and don't provide any functionality.

### File Location

`packages/cre8-react/src/components/ProgressStepsItem/ProgressStepsItem.tsx`

---

## RadioField

### Overview

Radio Field is the parent container for `radio-field-item`.
It is required to allow for grouping numerous radio fields that need additional context (in the form of `<legend>`).
It also provides accessibility roles, aria attributes and field note messaging on the group.
See [radio-field-item](?path=/story/Cre8-components-radio-field-item--default) for more guidance on its usage.

### File Location

`packages/cre8-react/src/components/RadioField/RadioField.tsx`

---

## RadioFieldItem

### Overview

A Radio Field Item adds a radio button to a Radio Field. Radio buttons let a user choose only one of several
options. Do not use a single radio button, because once selected, it cannot be de-selected. If the user can only
choose one, none or many options, use Checkbox instead.

### File Location

`packages/cre8-react/src/components/RadioFieldItem/RadioFieldItem.tsx`

---

## Select

### Overview

The Select control is designed and built to be used for selecting between choices in a form.
It is not a Dropdown control which is generally used for displaying lists of choices
that act as links or actions, like filter options.
Consider the use of a Select control carefully.
When you have less than 5 options for the user to choose from,
Radio or Checkbox inputs may be a better choice to display all of the options at once.
Users have to slow down to scan a list with more than 15 options,
so using an option group to give the options hierarchy may help users find their choice faster.
Alternately, a text input field might be a more appropriate control to use when there are too many options,
especially when used with typeahead/auto-complete.

## How to use

1. The collapsed default state always shows a default placeholder value or a selected value.
2. Sort list items in a logical order, such as grouping highly related options together, placing most common options first, using alphabetical or numeric orders or dates in chronological order.
3. A list that includes 6+ items should show a scrollbar.
4. Users should be able to use a keystroke to quickly jump to selecting an option that begins with the entered letter.
5. Utilize appropriate native controls for when a user is on a mobile device rather than our custom Select.
6. Adhere to our common form field conventions and always include a Label, provide short and clear error messages in context, avoid using the Read-only and Disabled states as much as possible, and utilize the info/formatting tip or helpful link rather than placeholder text.

### File Location

`packages/cre8-react/src/components/Select/Select.stories.tsx`

---

## SkeletonLoader

### Overview

Skeleton Loader allows for the ability to create placeholder UI loading states.
Developers are encouraged to pass into the Skeleton Loader their own parameters
to create simple (or complex) loading screens.

## How to Use

Skeleton states are simplified versions of components used on an initial page load
to indicate that the information on the page has not fully loaded yet.
They only appear for only a few seconds, disappearing once components and content populate the page.
These loaders use motion to convey that the page is not stuck and that data is still being loaded.
This can help to reduce user uncertainty. Skeleton objects should generally be visualized
by simple primitives which mimic the original content in a recognizable way.
It is recommended to use a more elaborate form if that is needed to make the component recognizable.
Never represent toast notifications, overflow menus, dropdown items, modals, and loaders with skeleton states.
Elements inside a modal may have a skeleton state, but the modal itself should not.
**IMPORTANT!** This is not a loading element and will provide no value to a screen reader user,
this is a decorative element only!

### File Location

`packages/cre8-react/src/components/SkeletonLoader/SkeletonLoader.tsx`

---

## Tabs

### Overview

Tabs are used to quickly navigate back and forth between views.
The Tab design and interaction varies depending on the requirements for your organization and project.
Standardizing on the best individual controls will improve usability and reduce development and QA time.
Create a standard set of Tab controls: Primary Tabs (for system navigation), Secondary Tabs (for sub navigation within a screen).

## Usability Guidelines

- The selected Tab should be visually differentiated from the other Tabs. The deselected Tabs should still look enabled. Dimming the other Tabs decreases the legibility of items that are actually active and clickable.
- There must be a minimum of 2 Tabs.
- Showing status in a Tab is non-standard (such as 0%, 10%).
- Tab labels and content should be parallel, with the exception of a Summary or Overview Tab which can be a rollup of content across other Tabs.
- Keep the font size of the Tabs the same. If the Tabs are a fixed width and one of the labels is too long, don't resize the text to fit and consider wrapping text to a second line.
- If possible, don't truncate text because it makes it harder to understand what's in the Tab.
- Try not to use more than six Tabs to keep the UI uncluttered.
- Do not stack Tabs on top of each other, and do not nest Tabs within Tabs. Find alternate ways of navigating page hierarchy.

### File Location

`packages/cre8-react/src/components/Tabs/Tabs.stories.tsx`

---

## Tag

### Overview

The tag component allows you to make selections, filter content, or trigger actions. While buttons are
expected to appear consistently and with familiar calls to actions, tags should appear dynamically
as a group of multiple interactions elements. It is a flexible
component that comes in the following types:

- **radio** Clicking a Radio Button causes it to change color. These tags only allow
  one option to be chosen and can be used in place of radio button when they need to be listed
  horizontally
- **checkbox** It allows for selecting options, It can be toggled on and off.
  checkbox tags can be used as an alternative to checkboxes.

### File Location

`packages/cre8-react/src/components/Tag/Tag.tsx`

---

## TagList

### Overview

Tag List must have children which are Tag components that are of type `checkbox` or `radio`.
The Tags must use the `neutral` variant and the `round` shape when they are inside a Tag List.
Tag List has a label that should be used to describe the purpose of the list.

### File Location

`packages/cre8-react/src/components/TagList/TagList.tsx`

---

## Tooltip

### Overview

The purpose of tooltips is to provide a tip or hint about what a tool, icon, link, or other interaction does.
If you need to present a call to action with perhaps a button for the user to click, then use
[Popover](/docs/Cre8-components-popover--docs) instead.
##Tooltip Styles
There are 4 alignment options for Tooltips: Top, Bottom, Right, and Left. Default placement is Bottom, below the
element it is describing. Top or Bottom alignment are the the preferred placement, particularly on screens that
have a more narrow viewport. Tooltips utilize Global styles and are not affected by brand themes.
**With icon**

- **iconRotateDegree** & **iconFlipDirection** props are optional.
- They are used to set up the correct dirrection for icons, for example,
  arrows, caret up or caret down.
  ##Usability Considerations
  With the exception of icons - which should always have alt text at a minimum - the UI should never rely on
  Tooltips for clarity, especially because they are not always discovered by the user. If the user cannot
  intuitively understand the interface without Tooltips, the interface should be redesigned.
  ##How to use
- Use Tooltips to clarify the UI element the user is interacting with, not to add additional content on the page.
  Also, do not simply restate content on the page, for example, the title of the field.
- Tooltips should be short and to the point. Example: "Click X to do X" or "Icon Description." If a succinct
  description is not possible, the interaction element should be redesigned.
- In a mouse-driven UI, Tooltips are triggered on hover (mouseover) and dismissed (disappear) when the user mouses
  away from the element. In touch UIs, a Tooltip is triggered by tapping and holding an item. The Tooltip is
  displayed as long as the user continues to hold the element. Tap and hold is a more advanced user behavior, and
  further reason for not relying on Tooltips. A novice user may never discover tap and hold for Tooltips.

### File Location

`packages/cre8-react/src/components/Tooltip/Tooltip.tsx`

---

## accordion

### Properties

| Property     | Type                             | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| ------------ | -------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `borderType` | unknown                          | The component is a vertically stacked list of headers that reveal or hide sections of related content on a page. The header title gives the user a high level overview of the content allowing the user to decide which sections to expand for the information. Accordion contains Accordion Items as children. This component is the wrapper for grouping related accordion items. Users can select different border types: default (no border), rectangle, rounded bottom, and rounded. |
| `borderType` | unknown                          | borderType Controls the border and border-radius of the parent container of the slotted accordions.                                                                                                                                                                                                                                                                                                                                                                                       |
| `hasDivider` | { type: Boolean, reflect: true } | When it is true, the inner dividers are displayed; if it is false, the inner dividers are not displayed                                                                                                                                                                                                                                                                                                                                                                                   |

### File Location

`packages/cre8-wc/components/accordion/accordion.ts`

---

## accordion-item

### Properties

| Property            | Type                             | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| ------------------- | -------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `isActive`          | { type: Boolean, reflect: true } | The accordion item component delivers large amounts of content in a small space through progressive disclosure. That is, the user gets key details about the underlying content and can choose to expand that content within the constraints of the accordion item. Accordion Items work especially well on mobile interfaces or whenever vertical space is at a premium. ## HOW TO USE Avoid “nested” accordion items—that is, collapsible content within collapsible content. This type of pattern goes against UX best practices. The Cre8 accordion item header allows for two sizes: 'sm' [cre8-typography-title-default] or 'lg' [cre8-typography-title-large] A chevron is used to indicate the “expand/collapse” action, though the entire header area is clickable for the same action. **NOTE**: The header of the accordion item uses h tags so be sure to choose the headingTagVariant that fits into the hierarchy of your html page layout. THIS WILL NOT CHANGE THE APPEARANCE OF THE HEADER. inserted between the cre8-accordion-item opening and closing tags. |
| `isActive`          | { type: Boolean, reflect: true } | When true, the Accordion Item is opens, when false it closes;                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| `accordionItemId`   | { type: String, reflect: true }  | Optional custom id for the accordion item, if one is not set, a random id is generated for you.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| `iconBefore`        | { type: Boolean, reflect: true } | Controls the positioning of the dropdown icon in relation to the text, true puts the icon before the text and false/undefined default the icon to the opposite side of the accordion item                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| `tertiaryIcon`      | { type: Boolean, reflect: true } | Controls the appearance of dropdown icon as being an icon-only button. true renders the tertiary variant and false/undefined renders the default secondary appearance.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| `size`              | { reflect: true }                | Users can choose between two header sizes: 'sm' [title-default] or 'lg' [title-large].                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| `headingTagVariant` | { reflect: true }                | Purely meant to help the user structure the HTML page hierarchy. Does not change the header size. Defaults to 'h3'                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| `heading`           | { type: String }                 | Controls the text content of the Accordion Item heading.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| `brandHeader`       | { type: Boolean }                | Controls whether the header takes on the theme's 'brand-strong' color                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| `private`           | { attribute: 'aria-controls' }   | The aria attribute to which is assigned the id of the details section which is revealed via interaction with the header.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |

### File Location

`packages/cre8-wc/components/accordion-item/accordion-item.module.ts`

---

## alert

### Properties

| Property         | Type                             | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| ---------------- | -------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `status`         | { reflect: true }                | The general purpose of an alert or notification is to draw the user’s attention and provide the user with timely, relevant information. ## Alert Styles: - There are 6 statuses for 6 types of alerts: 'error', 'info', 'notification', 'neutral', 'warning', 'success'. Each alert will have different icon to be displayed in the alert. - Users can select two types of alert variants: 'standalone', or 'banner'. - User can also choose the alert should be emphasized or not. There are two options: subtle or strong. - User can add button or link in the alert. If users choose to emphasize the alert (**strong**), user needs to used **"inverted"** prop in button or link. - User can choose whether the alert can be dismissed or not |
| `status`         | { reflect: true }                | The alert type.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| `variant`        | { reflect: true }                | The alert variant.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| `iconTitle`      | unknown                          | Icon title used for the icon alt text                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| `dismissed`      | { type: Boolean, reflect: true } | Dismissed property 1) State that changes to true and is removed when the banner is dismissed                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| `notDismissible` | { type: Boolean, reflect: true } | Dismissable property 1) Adds the ability to close when toggled to true                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |

### File Location

`packages/cre8-wc/components/alert/alert.module.ts`

---

## badge

### Properties

| Property  | Type             | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| --------- | ---------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `text`    | { type: String } | Status badges are used most often in tables or fat rows in a list. These Components serve a contextual purpose and don't provide any functionality. Badges should be organized inside a dedicated table row communicating status such as pending, approved or rejected.                                                                                                                                                                                                                                                                                           |
| `text`    | { type: String } | The badge text                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| `status`  | { type: String } | Status (a color variant prop) - **neutral** (default) renders a badge with a neutral state treatment - **success** renders a badge with success state treatment - **warning** renders a badge with warning state treatment - **error** renders a badge with error state treatment - **info** renders a badge with information state treatment - **attention** renders a badge with attention state treatment                                                                                                                                                      |
| `variant` | { type: String } | Background Style Variant - **dark\|undefined** (default) renders a badge with a dark background - **light** renders a badge with a light background - **white** renders a badge with a white background                                                                                                                                                                                                                                                                                                                                                           |
| `svg`     | { type: String } | SVG as a raw string - For badges with icons, the icon is defined by this prop - Pass in a raw svg as a String. We use raw string loader for this but any method of getting raw svgs will do - Import example:`import svgFeedback from '/Users/tylersmbp/Projects/cre8-web-components/packages/cre8-wc/icons/System/Regular/Feedback.svg?raw';` - [cre8-icons Github repo](https://git.express-scripts.com/ExpressScripts/cre8-icons) This is the Github repo for Cre8 icons, which includes a link to the storybook as well as relavant information for new icons |

### File Location

`packages/cre8-wc/components/badge/badge.module.ts`

---

## band

### Properties

| Property     | Type                             | Description                                                                                                                                     |
| ------------ | -------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------- |
| `variant`    | unknown                          |                                                                                                                                                 |
| `variant`    | unknown                          | Gradient variant <cre8-text-passage size="sm"> <ul> <li>**1** renders the band with the set gradient background</li> </ul> </cre8-text-passage> |
| `fullHeight` | { type: Boolean, reflect: true } | Full height variant 1) Sets the height to 100%                                                                                                  |

### File Location

`packages/cre8-wc/components/band/band.module.ts`

---

## breadcrumbs

### Properties

| Property       | Type    | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| -------------- | ------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `navAriaLabel` | unknown | The breadcrumbs component is a secondary navigation pattern that helps a user understand where the user is located. The breadcrumbs component shows the users their current location relative to the information architecture It enables the users to quickly move up to a parent level or previous location. ## How to Use - Import 'Breadcrumbs' component. - Add the pages in the path of the breadcrumbs using `cre8-breadcrumbs-item`. All the pages in the breadcrumbs component should be interactive. - All the page should link to their respective pages (except the current page) using `cre8-link`. - The current page is included in the breadcrumbs trail. - The current page is always the last text listed and is not an interactive link. |
| `navAriaLabel` | unknown | aria-label attribute to designate at name for the nav. Can be override by user                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             |

### File Location

`packages/cre8-wc/components/breadcrumbs/breadcrumbs.module.ts`

---

## breadcrumbs-item

### Overview

### File Location

`packages/cre8-wc/components/breadcrumbs-item/breadcrumbs-item.module.ts`

---

## button

### Properties

| Property             | Type                             | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| -------------------- | -------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `text`               | unknown                          | The size and state of buttons on the screen serve as visual cues for the user about what they can do and what they should do next. They indicate the availability and priority of the action on the page. - Buttons are a single call-to-action where a single click performs that action - Use buttons when you are performing an action which is almost always on the same page - Use a link instead of a button when you're navigating to another place ## How to Use Buttons are distinguished by three key properties: - **Visual Priority**: Style and size: Primary, Secondary, or Tertiary styles; each with large and small variations - **State**: Interaction state: hover/click (press), focus, disabled, and submitting/loading (only for large buttons) - **Brand**: Styles determined by the site or component theme ### Usage Guidelines Primary, Secondary and Tertiary styles emphasize or de-emphasize an action. They also define background, font style, and border colors. Large and small sizing assists with visual priority by defining button heights, left and right internal padding, and font-size. #### System Feedback Each button has a default and hover/click (press) state that give the user feedback that they have successfully interacted with a button. Button presses should always be combined with other types of timely system feedback. Examples of system feedback may be a page refresh, exposing additional controls or content, dialogs, alerts and notifications. If there is perceived a delay in system response, generally due to technical constraints, provide a progress or loading indicator. #### Button Text - Button text should be as short and simple as possible, ideally a maximum of 3 words. - Use Title Case for readability. - They should not include punctuation (exception: "Loading..."). - They should not be used as an indicator of what happens on the next page, or as a substitute for a progress meter. #### Button With Icon For button with icon: - **iconRotateDegree** & **iconFlipDirection** props are optional. - They are used to set up the correct direction for icons, for example, arrows, caret up or caret down. #### Button Styling - DO use only the styles of the brand you are working on. - DO NOT combine styles, even if the page is co-branded. #### Button Sizes - DO always pair like sizes together and maintain the hierarchy of Primary and Secondary/Tertiary. - DO NOT mix sizes of buttons when they are used together as a group. #### Input Pairing Primary and Secondary buttons may be paired with input fields. Only one Primary button may appear on each screen. Use the Secondary button when there are multiple in-context buttons and/or when there is an emphasized page level button. When used in a form context, the button's `type` needs to be `submit` to pass along form data. - DO use only large buttons with input fields. - DO NOT use small buttons with input fields. |
| `text`               | unknown                          | The button text. Should be as short and simple as possible, ideally a maximum of 3 words. - Use Title Case for readability. - Should not include punctuation (exception: "Loading..."). - Should not be used as an indicator of what happens on the next page, or as a substitute for a progress meter.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| `variant`            | { type: String }                 | Style variant - **primary** renders the button used for primary actions. Presents highest visual priority. When grouped with other buttons, only one primary is allowed - **secondary** renders a secondary button. Presents a lower visual priority - **tertiary** renders a tertiary button. Presents the lowest visual priority. Should be used in limited amounts - consider if a link (`<a>`) would be more appropriate                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| `disabled`           | { type: Boolean, reflect: true } | Disabled attribute **NOTE**: Disabled states are used to indicate that an action is temporarily unavailable. In general, using disabled states is NOT advised. It should be clear to the user what actions they must take to activate the button. Real-time, field-level validation can help provide clarity.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| `neutral`            | { type: Boolean, reflect: true } | This property is for a neutral button propery mainly used for the secondary or tertiary button variant.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| `inverse`            | { type: Boolean, reflect: true } | Inverse attribute The inverse prop allows the button to work on either a light or dark surface.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            |
| `href`               | unknown                          | Provide this property if you intend to use button styles for an anchor tag (`<a>`). This changes the component markup from `<button>` usage to `<a>` instead.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| `target`             | unknown                          | Target attribute for a link if providing `href` to style a link as a button - **\_blank** yields a link that opens in a new tab - **\_self** yields a link that loads the URL into the same browsing context as the current one. This is the default behavior - **\_parent** yields a link that loads the URL into the parent browsing context of the current one. If there is no parent, this behaves the same way as \_self - **\_top** yields a link that loads the URL into the top-level browsing context. If there is no parent, this behaves the same way as \_self.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| `type`               | unknown                          | Type of button. - **button** (default) button has no default behavior and does nothing unless provided some sort of client-side trigger - **submit** button for submitting form data to a server                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| `rel`                | unknown                          | Rel if this is an <a> element - this swaps <button> for <a>                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| `iconName`           | unknown                          | Deprecated: iconName, use svg instead Icon name if including an icon within a button. Must include the icon's position with `iconPostion`. This prop is used for <cre8-icon-legacy>                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| `svg`                | unknown                          | svg as a raw string - For button with icon, the icon is defined by this prop. - Pass in a raw svg as a String for using <cre8-icon> - Must include the icon's position with `iconPostion`.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| `iconRotateDegree`   | { type: Number }                 | iconRotateDegree is used for <cre8-icon> to set the arrow in the correct direction                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| `iconFlipDirection`  | unknown                          | iconFlipDirection is used for <cre8-icon> to set the icon in the correct direction                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| `iconPosition`       | unknown                          | Icon position. Must include the name of the icon with `iconName` - **before** places the icon before the button text - **after** places the icon after the button text                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| `size`               | unknown                          | Size variants add another way to increase or decrease visual priority of a button. - **sm** Shrinks the button typography and overall size from the default. Use when vertical space is constrained. - **md** This is the default value for the size. - **lg** Increases the button typography and overall size from the default.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| `hideText`           | { type: Boolean, reflect: true } | Visually hide button text. Text is still accessible to assistive technology. Use this for icon-only buttons for accessibility                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| `fullWidth`          | { type: Boolean, reflect: true } | Full width button                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| `loading`            | { type: Boolean, reflect: true } | _ Changes styling to an active state with a spinning icon. _ Adds accessibility treatment by: _ announcing via voiceover when the loading success/error state via a aria-live region _ setting `aria-disabled` \* Disables click events / form submitting while allowing focus (for accessibility)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| `loadingComplete`    | { type: Boolean, reflect: true } | _ Variant of the loading button that: _ Removes loading spinner \* Informs the SR user that the loading status is now complete, with visually hidden text in the live area                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| `ariaLive`           | unknown                          | Controls whether your loading status update to voiceover users will occur immediately (used for more urgently needed updates) using `assertive` or at the next convenient pause in their navigation using `polite`.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| `splitButtonType`    | unknown                          | These two subvariants of the split button style the two seperate buttons to style as a singular button                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| `buttonAriaExpanded` | { type: Boolean, reflect: true } | Button aria expanded attribute                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             |

### File Location

`packages/cre8-wc/components/button/button.module.ts`

---

## button-group

### Properties

| Property      | Type    | Description                          |
| ------------- | ------- | ------------------------------------ |
| `orientation` | unknown |                                      |
| `orientation` | unknown | Responsive Button Group (for modals) |

### File Location

`packages/cre8-wc/components/button-group/button-group.module.ts`

---

## calendar

### Properties

| Property       | Type                             | Description                  |
| -------------- | -------------------------------- | ---------------------------- |
| `hasShortcuts` | { type: Boolean, reflect: true } | Query the navigation wrapper |

### File Location

`packages/cre8-wc/components/date-picker/calendar/calendar.ts`

---

## card

### Properties

| Property  | Type    | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| --------- | ------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `variant` | unknown | The card component acts a general container element sectioned off by slots: `header`, `body`, `footer`. # How to Use 1. Wrap the card component tags around any html template code which has been properly imported into the file. 2. Decide the layout that best fits the designs assigned to your work. Generally, we recommend visual elements appear in the `header` (optional slot), while `body` remains reserved for custom html content that gives further context and meaning to the `header`. 3. The card defaults to a column and includes a `horizontal` directional variant. If you have a card where the layout of the content is more aligned horizontally, using the `horizontal` variant will ease the construction of your component 4. Finally, we typically recommend reserving the footer for any interactive elements such as buttons for navigating to further information. NOTE: Adjusting props not mentioned above may result in unpredictable states |
| `variant` | unknown | Style variants - **bare** renders a card without a border and without padding around the content - **horizontal** renders a card with header, body, footer oriented in a row rather than a column - **horizontal-bare** renders a card with header, body, footer oriented in a row rather than a column without a border and without padding around the content                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| `align`   | unknown | Alignment variant - **center** renders a card that has center aligned content/text                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |

### File Location

`packages/cre8-wc/components/card/card.module.ts`

---

## checkbox-field

### Properties

| Property             | Type                             | Description                                                                                                                                                                                                                                                                                                                                 |
| -------------------- | -------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `label`              | unknown                          | Checkbox Field is the parent container for `checkbox-field-item`. It is required to allow for grouping numerous checkboxes that need additional context (in the form of `<legend>`). It also provides accessibility roles, aria attributes and field note messaging on the group. See `checkbox-field-item` for more guidance on its usage. |
| `label`              | unknown                          | Checkbox container legend label                                                                                                                                                                                                                                                                                                             |
| `fieldNote`          | unknown                          | Checkbox container fieldnote                                                                                                                                                                                                                                                                                                                |
| `ariaDescribedBy`    | unknown                          | Checkbox container fieldnote aria describe by                                                                                                                                                                                                                                                                                               |
| `fieldNoteIconName`  | unknown                          | Checkbox container fieldnote icon name                                                                                                                                                                                                                                                                                                      |
| `fieldNoteKnockout`  | { type: Boolean, reflect: true } | Checkbox container fieldnote knockout                                                                                                                                                                                                                                                                                                       |
| `fieldNoteIsSuccess` | { type: Boolean, reflect: true } | Checkbox container fieldnote isSuccess                                                                                                                                                                                                                                                                                                      |
| `fieldNoteIsError`   | { type: Boolean, reflect: true } | Checkbox container fieldnote isError                                                                                                                                                                                                                                                                                                        |

### File Location

`packages/cre8-wc/components/checkbox-field/checkbox-field.module.ts`

---

## checkbox-field-item

### Properties

| Property                    | Type                             | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| --------------------------- | -------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `label`                     | { type: String }                 | Checkbox Field Item is the combination of a checkbox input, label and field note. Checkboxes can turn an option on or off. Checkboxes should be used when the user is allowed to select one, none or multiple options OR to "opt-in" (ex. I would like to receive the newsletter by email) or as a required acknowledgement(ex. I've read the Terms and Conditions). If the user can only chose one option from many, use `radio-field-item`. ## How to Use - A checkbox is independent of all other checkboxes in the list, so checking one box should not uncheck the others in the group. - Place checkbox options one on top of another vertically. Do not display them in a row horizontally. - Avoid disabled and read-only states as much as possible. ## Universal Form Field Rules - Unless indicated with the "(Optional)" label, all fields are assumed required. Minimize the number of optional fields to keep forms as short as possible. - Always include a label written in sentence case. - Avoid using the read-only and disabled states as much as possible. |
| `label`                     | { type: String }                 | The checkbox label                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| `isError`                   | { type: Boolean, reflect: true } | Changes the component's treatment to represent an error state                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| `errorText`                 | unknown                          | Visually hidden text that always signifies that this is an error for screen reader usage                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| `errorNote`                 | unknown                          | The error field note that appears below the default field note                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| `isSuccess`                 | { type: Boolean, reflect: true } | Changes the component's treatment to represent a success state                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| `successText`               | unknown                          | Visually hidden text that always signifies that this is successful for screen reader usage                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| `successNote`               | unknown                          | The success field note that appears below the default field note                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| `disabled`                  | { type: Boolean, reflect: true } | Disabled State                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| `checked`                   | { type: Boolean, reflect: true } | Checked State                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| `fieldId`                   | unknown                          | Checkbox FieldId                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| `fieldNote`                 | unknown                          | Checkbox FieldNote                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| `ariaDescribedBy`           | unknown                          | Checkbox fieldnote ariaDescribeBy                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| `validationAriaDescribedBy` | unknown                          | Additional aria-describedby connection to id for additional success and error notes to be accessible                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            |
| `name`                      | unknown                          | Checkbox name                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| `required`                  | { type: Boolean, reflect: true } | Required property                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| `fieldNoteIconName`         | unknown                          | Checkbox fieldnote icon name                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |

### File Location

`packages/cre8-wc/components/checkbox-field-item/checkbox-field-item.module.ts`

---

## components

### Properties

| Property  | Type    | Description                                                                                         |
| --------- | ------- | --------------------------------------------------------------------------------------------------- |
| `variant` | unknown | A base element.                                                                                     |
| `get`     | unknown | Stores the value for the `value` getter and setter.                                                 |
| `get`     | unknown | Stores the intial value of the field so that it can be reset                                        |
| `get`     | unknown | The underlying HTML form field. This should be implemented with `@query` in the implementing class. |
| `get`     | unknown | The value of the form field.                                                                        |

### File Location

`packages/cre8-wc/components/cre8-element.ts`

---

## danger-button

### Properties

| Property             | Type                             | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| -------------------- | -------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `text`               | unknown                          | The size and state of buttons on the screen serve as visual cues for the user about what they can do and what they should do next. They indicate the availability and priority of the action on the page. - Buttons are a single call-to-action where a single click performs that action - Use Danger Buttons when you are performing an action that is potentially dangerous, such as permanently deleting information - Use a link instead of a button when you're navigating to another place ## How to Use Danger Buttons are distinguished by three key properties: - **Visual Priority**: Style and size: Primary, Secondary, or Tertiary styles; each with large and small variations - **State**: Interaction state: hover/click (press), focus, disabled, and submitting/loading (only for large buttons) - **Brand**: Styles determined by the site or component theme ### Usage Guidelines Primary, Secondary and Tertiary styles emphasize or de-emphasize an action. They also define background, font style, and border colors. Large and small sizing assists with visual priority by defining button heights, left and right internal padding, and font-size. #### System Feedback Each button has a default and hover/click (press) state that give the user feedback that they have successfully interacted with a button. Button presses should always be combined with other types of timely system feedback. Examples of system feedback may be a page refresh, exposing additional controls or content, dialogs, alerts and notifications. If there is perceived a delay in system response, generally due to technical constraints, provide a progress or loading indicator. #### Button Text - Button text should be as short and simple as possible, ideally a maximum of 3 words. - Use Title Case for readability. - They should not include punctuation (exception: "Loading..."). - They should not be used as an indicator of what happens on the next page, or as a substitute for a progress meter. #### Button Styling - DO use only the styles of the brand you are working on. - DO NOT combine styles, even if the page is co-branded. #### Button Sizes - DO always pair like sizes together and maintain the hierarchy of Primary and Secondary/Tertiary. - DO NOT mix sizes of buttons when they are used together as a group. #### Input Pairing Primary and Secondary buttons may be paired with input fields. Only one Primary button may appear on each screen. Use the Secondary button when there are multiple in-context buttons and/or when there is an emphasized page level button. When used in a form context, the button's `type` needs to be `submit` to pass along form data. - DO use only large buttons with input fields. - DO NOT use small buttons with input fields. |
| `text`               | unknown                          | The button text. Should be as short and simple as possible, ideally a maximum of 3 words. - Use Title Case for readability. - Should not include punctuation (exception: "Loading..."). - Should not be used as an indicator of what happens on the next page, or as a substitute for a progress meter.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| `variant`            | { type: String }                 | Style variant - **primary** renders the button used for primary actions. Presents highest visual priority. When grouped with other buttons, only one primary is allowed - **secondary** renders a secondary button. Presents a lower visual priority - **tertiary** renders a tertiary button. Presents the lowest visual priority. Should be used in limited amounts - consider if a link (`<a>`) would be more appropriate                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| `disabled`           | { type: Boolean, reflect: true } | Disabled attribute **NOTE**: Disabled states are used to indicate that an action is temporarily unavailable. In general, using disabled states is NOT advised. It should be clear to the user what actions they must take to activate the button. Real-time, field-level validation can help provide clarity.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| `href`               | unknown                          | Provide this property if you intend to use button styles for an anchor tag (`<a>`). This changes the component markup from `<button>` usage to `<a>` instead.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| `target`             | unknown                          | Target attribute for a link if providing `href` to style a link as a button - **\_blank** yields a link that opens in a new tab - **\_self** yields a link that loads the URL into the same browsing context as the current one. This is the default behavior - **\_parent** yields a link that loads the URL into the parent browsing context of the current one. If there is no parent, this behaves the same way as \_self - **\_top** yields a link that loads the URL into the top-level browsing context. If there is no parent, this behaves the same way as \_self.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| `type`               | unknown                          | Type of button. - **button** (default) button has no default behavior and does nothing unless provided some sort of client-side trigger - **submit** button for submitting form data to a server                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| `rel`                | unknown                          | Rel if this is an <a> element - this swaps <button> for <a>                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| `svg`                | unknown                          | SVG raw string if including an icon within a button. Must include the icon's position with `iconPostion`. This prop is used for <cre8-icon>                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| `iconRotateDegree`   | { type: Number }                 | rotate is used for <cre8-icon> to set the arrow in the correct direction                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| `iconFlipDirection`  | unknown                          | flip is used for <cre8-icon> to set the icon in the correct direction                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| `iconPosition`       | unknown                          | Icon position. Must include the name of the icon with `iconName` - **before** places the icon before the button text - **after** places the icon after the button text                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            |
| `size`               | unknown                          | Size variants add another way to increase or decrease visual priority of a button. - **sm** shrinks the button typography and overall size from the default. Use when vertical space is constrained. - **lg** increases the button typography and overall size from the default.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| `hideText`           | { type: Boolean, reflect: true } | Visually hide button text. Text is still accessible to assistive technology. Use this for icon-only buttons for accessibility                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| `fullWidth`          | { type: Boolean, reflect: true } | Full width button                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| `loading`            | { type: Boolean, reflect: true } | _ Changes styling to an active state with a spinning icon. _ Adds accessibility treatment by: _ announcing via voiceover when the loading success/error state via a aria-live region _ setting `aria-disabled` \* Disables click events / form submitting while allowing focus (for accessibility)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| `loadingComplete`    | { type: Boolean, reflect: true } | _ Variant of the loading button that: _ Removes loading spinner \* Informs the SR user that the loading status is now complete, with visually hidden text in the live area                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| `inverted`           | { type: Boolean }                | Inverted colors Danger Button (onDark)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            |
| `ariaLive`           | unknown                          | Controls whether your loading status update to voiceover users will occur immediately (used for more urgently needed updates) using `assertive` or at the next convenient pause in their navigation using `polite`.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| `buttonAriaExpanded` | { type: Boolean, reflect: true } | Button aria expanded attribute                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |

### File Location

`packages/cre8-wc/components/danger-button/danger-button.module.ts`

---

## date-picker

### Properties

| Property       | Type                             | Description                                                                                                                                                                                                       |
| -------------- | -------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `hasShortcuts` | { type: Boolean, reflect: true } | The Date Picker component renders a form group with label, control, help text and validation styling much like the Field component but exclusively for type=date. Cre8DatePicker inherts the Cre8Field component. |
| `hasShortcuts` | { type: Boolean, reflect: true } | Quick Shortcuts Variant                                                                                                                                                                                           |

### File Location

`packages/cre8-wc/components/date-picker/date-picker.module.ts`

---

## divider

### Properties

| Property  | Type    | Description                                                                                                                                                   |
| --------- | ------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `variant` | unknown | The divider component is a separator between sections of content or groups of items. It often contains a horizontal or vertical line.                         |
| `variant` | unknown | Divider variants - By default, the component renders the horizontal divider - **vertical** renders the vertical divider                                       |
| `status`  | unknown | Status (a color variant prop) - By default, the divider has gray color. - **brand**, the divider has blue color. - **knockout**, the divider has white color. |

### File Location

`packages/cre8-wc/components/divider/divider.module.ts`

---

## dropdown

### Properties

| Property           | Type             | Description                                                                                                    |
| ------------------ | ---------------- | -------------------------------------------------------------------------------------------------------------- |
| `buttonText`       | { type: String } | The Dropdown menu itself is a container that can host multiple interactive items, commonly formatted as a list |
| `buttonText`       | { type: String } | Dropdown header                                                                                                |
| `maxHeight`        | unknown          | Enables scrolling once content reached to specified height, the height should mention in px units, ex: 100px   |
| `dropdownWithLink` | unknown          | button text represents as a link                                                                               |

### File Location

`packages/cre8-wc/components/dropdown/dropdown.module.ts`

---

## dropdown-item

### Properties

| Property    | Type             | Description                                                                                                                                                                                                                                          |
| ----------- | ---------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `ariaLabel` | { type: String } | The Dropdown item component is designed to be used with Dropdown component, each item represents a selectable option or action within the dropdown menu. It can be configured to trigger actions, navigate to links, initiate commands when clicked. |

### File Location

`packages/cre8-wc/components/dropdown-item/dropdown-item.module.ts`

---

## feature

### Properties

| Property   | Type                             | Description                                   |
| ---------- | -------------------------------- | --------------------------------------------- |
| `imgSrc`   | unknown                          |                                               |
| `imgSrc`   | unknown                          | Image source                                  |
| `imgAlt`   | unknown                          | Image alt text                                |
| `inverted` | { type: Boolean, reflect: true } | Inverted variant 1) Used for dark backgrounds |

### File Location

`packages/cre8-wc/components/feature/feature.module.ts`

---

## field

### Overview

The Field component renders a form group with label, control, help text and validation styling. There are
convenience variants of Field to support HTML5 input types and static content.

### Properties

| Property                    | Type                             | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| --------------------------- | -------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `autocomplete`              | unknown                          | Autocomplete attribute that allows input to expect certain types of information. Note: autocomplete is supported by most browsers, but the suggested 'completions' are also sourced from those browsers. Values come from past user stored data from past interactions in that browser, such as: 1. From past values entered by the user, but they may also come from pre-configured values. For instance, a browser might let the user save their name, address, phone number, and email addresses for autocomplete purposes. 2. Perhaps the browser offers the ability to save encrypted credit card information, for autocompletion following a an authentication procedure. See: [MDN web docs\_](https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/autocomplete) NOTE:: In order to provide autocompletion, user-agents might require input, select, textarea elements to: 1. Have a {{name}} and/or {{id}} attribute 2. Be descendants of a form element 3. The form to have a [submit button](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/submit) |
| `pattern`                   | unknown                          | Pattern attribute defines a regular expression to validate against input                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| `type`                      | unknown                          | Type variants - **text** renders a standard text input - **email** renders a text input for an email format - **number** renders an input for number values only - **url** renders an input for urls only - **tel** renders an input for telephone number values only                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| `placeholder`               | unknown                          | The placeholder text that appears inside the input                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| `label`                     | unknown                          | The required label that appears above the input                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| `name`                      | unknown                          | The name property on the input                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| `fieldId`                   | unknown                          | The unique id of the field <br/><br/> _\*This property is dynamically set_                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| `fieldNote`                 | unknown                          | The text that displays below in text field input                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| `ariaLive`                  | unknown                          | Controls how the voiceover will experience the new information when field note changes, immediately (used for more urgently needed updates) using `assertive` or at the next convenient pause in their navigation using `polite`.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| `ariaDescribedBy`           | unknown                          | Used to connect the field note in text field to the text menu for accessibility                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| `required`                  | { type: Boolean, reflect: true } | The required attribute on the input                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| `disabled`                  | { type: Boolean, reflect: true } | The disabled attribute on the input                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| `isError`                   | { type: Boolean, reflect: true } | Changes the component's treatment to represent an error state                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| `errorText`                 | unknown                          | Visually hidden text that always signifies that this is an error for screen reader usage                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| `errorNote`                 | unknown                          | The error field note that appears below the default field note                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| `max`                       | unknown                          | The max attribute defines the maximum value that is acceptable and valid for the input containing the attribute.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| `min`                       | unknown                          | The min attribute defines the minimum value that is acceptable and valid for the input containing the attribute.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| `maxlength`                 | { type: Number }                 | The maxlength is an integer above 0 that indicates the maximum allowed characters to be entered. When using the maxlength prop, you must also use the "required" prop to provide Constraint Validation on the input field. This allows users to know why the input they attempted didn't render in the input field. see [MDN maxlength](https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/maxlength#constraint_validation)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| `validationAriaDescribedBy` | unknown                          | Additional aria-describedby connection to id for additional success and error notes to be accessible                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| `isSuccess`                 | { type: Boolean, reflect: true } | Changes the component's treatment to represent a success state                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| `successText`               | unknown                          | Visually hidden text that always signifies that this is successful for screen reader usage                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| `readonly`                  | { type: Boolean, reflect: true } | Readonly attribute                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| `successNote`               | unknown                          | The success field note that appears below the default field note                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |

### File Location

`packages/cre8-wc/components/field/field.module.ts`

---

## field-note

### Properties

| Property    | Type                             | Description                                                                                                                                                      |
| ----------- | -------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `isError`   | { type: Boolean, reflect: true } | Field Note gives direction on how to fill out a form field and to alert users of form errors and successes. It’s used below an input field and never on its own. |
| `isError`   | { type: Boolean, reflect: true } | Changes the component's treatment to represent an error @attr {boolean}                                                                                          |
| `isSuccess` | { type: Boolean, reflect: true } | Changes the component's treatment to represent a success @attr {boolean}                                                                                         |
| `iconName`  | unknown                          | DEPRECATED: Icon name used for the icon before to the field note                                                                                                 |

### File Location

`packages/cre8-wc/components/field-note/field-note.module.ts`

---

## footer

### Overview

### File Location

`packages/cre8-wc/components/footer/footer.module.ts`

---

## global-nav

### Properties

| Property       | Type                             | Description                                                                                                                                                        |
| -------------- | -------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `inverted`     | { type: Boolean, reflect: true } |                                                                                                                                                                    |
| `inverted`     | { type: Boolean, reflect: true } | Inverted variant 1) Used for dark backgrounds                                                                                                                      |
| `behavior`     | unknown                          | Behavior variant <cre8-text-passage size="sm"> <ul> <li>**side-by-side** keeps the primary nav item always in a horizontal pattern</li> </ul> </cre8-text-passage> |
| `navAriaLabel` | unknown                          | aria-label attribute to designate at name for the nav. Can be override by user                                                                                     |

### File Location

`packages/cre8-wc/components/global-nav/global-nav.module.ts`

---

## global-nav-item

### Properties

| Property   | Type                             | Description                                                   |
| ---------- | -------------------------------- | ------------------------------------------------------------- |
| `text`     | unknown                          |                                                               |
| `text`     | unknown                          | Primary nav item text                                         |
| `href`     | unknown                          | Primary nav item href                                         |
| `iconName` | unknown                          | Icon name                                                     |
| `megaMenu` | { type: Boolean, reflect: true } | Append to the class name. Used for passing in utility classes |

### File Location

`packages/cre8-wc/components/global-nav-item/global-nav-item.module.ts`

---

## grid

### Overview

### Properties

| Property  | Type    | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| --------- | ------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `variant` | unknown | Style variant - **side-by-side** yields a grid whose grid items display side-by-side (2 per row) on all screen sizes - **2up** yields a grid whose grid items are stacked on small screens but display side-by-side when enough screen real estate is available to do so - **3up** yields a grid whose grid items are stacked on small screens, transforms to a 2-across pattern and then transforms again to a 3-across pattern - **1-3up** yields a grid whose grid items are stacked on small screens and transforms to a 3-across pattern on larger screens - **4up** yields a grid whose grid items are stacked on small screens, transforms to a 2-across pattern, transforms again to a 3-across pattern, and ultimately transforms to a 4-across pattern - **1-2-4up** yields a grid whose grid items are stacked on small screens, transforms to a 2-across pattern, and ultimately transforms to a 4-across pattern - **1-4up** yields a grid whose grid items are stacked on small screens, transforms to a 4-across pattern on medium/large screens |
| `gap`     | unknown | Style variant - **none** yields a grid whose grid items are spaced without any gutter in between - **sm** yields a grid whose grid items are spaced with a gap smaller than the default - **lg** yields a grid whose grid items are spaced with a gap larger than the default                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| `break`   | unknown | Break variant - **faster** breaks the grid at a smaller width than the default. Example: 2up grid breaks to 2 per row at smaller width than default - **slower** breaks the grid at a larger width than the default. Example: 2up grid breaks to 2 per row at larger width than default - **lg** yields a grid whose grid items are spaced with a gap larger than the default                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |

### File Location

`packages/cre8-wc/components/grid/grid.module.ts`

---

## grid-item

### Overview

### File Location

`packages/cre8-wc/components/grid-item/grid-item.module.ts`

---

## header

### Overview

### File Location

`packages/cre8-wc/components/header/header.module.ts`

---

## heading

### Overview

HTML headings are titles or subtitles that you want to display on a webpage. The H1 is the most important and H6
is the least important in the content hierarchy.

# How to Use

1. The cre8-heading tag wraps around one of the six native HTML "h" tags, depending on your chosen variation.
2. There are two main use cases for using this component:
   text passage headings and Components with a title (i.e. modal, card or alert)
3. There will be instances when the design requires the heading text to have the brand color applied
   in which case you should set the [brandColor](?path=/story/cre8-components-heading--brand-color)
   attribute to true on the cre8-heading tag.
4. For dark backgrounds, add the [inverted](?path=/story/cre8-components-heading--inverted)
   attribute to the tag for white text.

### Properties

| Property     | Type                             | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| ------------ | -------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `type`       | unknown                          | Heading type <cre8-text-passage size="small"> <ul> <li>**display-default** renders a heading with the heading display-default preset treatment</li> <li>**display-small** renders a heading with the heading display-small preset treatment</li> <li>**headline-large** renders a heading with the heading headline-large preset treatment</li> <li>**headline-default** renders a heading with the heading headline-default preset treatment</li> <li>**headline-small** renders a heading with the heading headline-small preset treatment</li> <li>**title-xlarge** renders a heading with the heading title-xlarge preset treatment</li> <li>**title-large** renders a heading with the heading title-large preset treatment</li> <li>**title-default** renders a heading with the heading title-default preset treatment</li> <li>**title-small** renders a heading with the heading title-small preset treatment</li> <li>**label-large** renders a heading with the label-large preset treatment</li> <li>**label** renders a heading with the label preset treatment</li> <li>**label-small** renders a heading with the label-small preset treatment</li> <li>**meta-large** renders a heading with the meta-large preset treatment</li> <li>**meta-default** renders a heading with the meta-default preset treatment</li> <li>**meta-small** renders a heading with the meta-small preset treatment</li> </ul> </cre8-text-passage> |
| `tagVariant` | unknown                          | Dynamic tag name for the component 1) This is needed to use proper semantic heading treatments depending on where the banner lives on the page <cre8-text-passage size="small"> <ul> <li>**h1** renders an `h1` tag</li> <li>**h2** renders an `h2` tag. This is the default</li> <li>**h3** renders an `h3` tag</li> <li>**h4** renders an `h4` tag</li> <li>**h5** renders an `h5` tag</li> <li>**h6** renders an `h6` tag</li> </ul> </cre8-text-passage>                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| `inverted`   | { type: Boolean, reflect: true } | Invert the color of the font from dark to light. An inverted `heading` should be used on a dark background.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| `brandColor` | { type: Boolean, reflect: true } | Apply the brand color to the heading text.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |

### File Location

`packages/cre8-wc/components/heading/heading.module.ts`

---

## hero

### Properties

| Property | Type    | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| -------- | ------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `imgSrc` | unknown |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| `imgSrc` | unknown | Image source                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| `imgAlt` | unknown | Image alt text                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| `align`  | unknown | Position variant. Bottom left is the default position <cre8-text-passage size="sm"> <ul> <li>**top-left** renders content in the top left corner of the image</li> <li>**left** renders content in the left, center part of the image</li> <li>**top-center** renders content in the top, center part of the image</li> <li>**center** renders content center of the image</li> <li>**bottom-center** renders content bottom center of the image</li> <li>**top-right** renders content top-right of the image</li> <li>**right** renders content right of the image</li> <li>**bottom-right** renders content bottom, right part of the image</li> </ul> </cre8-text-passage> |

### File Location

`packages/cre8-wc/components/hero/hero.module.ts`

---

## icon

### Properties

| Property    | Type                             | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| ----------- | -------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `focusable` | { type: Boolean, reflect: true } | <svg> is a web component, which can be used with any frontend framework and use any svg. It takes raw svgs as props and renders them. **'svg-legacy'** will be **deprecated** in Web Components v0.5.0 - [List of new figma icons](https:/www.figma.com/file/j1a0rBkoH65XiGKfq7ppWa/Iconography?type=design&node-id=2037-5773&mode=design&t=6ZzC6KH3Gkxf3fj5-4) - The new `svg` from the svg package: https:/static-dev.esi-memberweb-dev.aws.evernorthcloud.com/svgs/. ##Usability Considerations - If the icon is decorative: set `aria-hidden` to true. - If the icon is interactive (not decorative): set `aria-hidden` to false and add the `aria-label` - If the icon is key to functionality from a screen reader perspective, it is required to add `aria-label` which will describe the icon. For example, if the icon is a close button, setting `aria-label="Close"`will give the SVG an aria-label to make it sufficiently accessible. [More information on Accessibility with svgs](https:/static-dev.esi-memberweb-dev.aws.evernorthcloud.com/svgs/?path=/story/getting-started-accessibility--page) ##How to use Cre8 Web Components (cre8-wc) includes the `cre8_dev/svgs` package. If you need to install a newer version than what's included, please see the [installation instructions for svgs](https:/git.express-scripts.com/ExpressScripts/svgs#installation). - Import the component (this is the icon container): `import '@cre8_dev/svgs';` - Import an svg as a string: `import svgInfo from 'cre8_dev/svgs/lib/icons/System/Regular/Info.svg?raw';` Your import paths may be different depending on your project's build configuration. Please see [Importing Icons](https:/static-dev.esi-memberweb-dev.aws.evernorthcloud.com/svgs/?path=/story/icon-sets-importing-icons--page) of the `cre8_dev/svgs` documentation for more information. |
| `focusable` | { type: Boolean, reflect: true } | Focusable                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| `name`      | unknown                          | Icon name (this method of passing in svgs is to be deprecated)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| `iconUrl`   | unknown                          | Icon path 1) This points to the file where the icon sprite lives 2) This method of pathing will soon be depricated                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| `iconTitle` | unknown                          | Icon Title, this string is used for the aira-label of the svg                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |

### File Location

`packages/cre8-wc/components/icon/icon.module.ts`

---

## inline-alert

### Properties

| Property    | Type                             | Description                                                                                                                                                                                                                                                                                                                                                                             |
| ----------- | -------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `iconName`  | unknown                          | In cases when it is necessary to alert the user but a less strong message that cannot be dismissed is desired, use an in-line contextual alert message as the least "severe" message type. These can be displayed anywhere on the page, but should never cover content. Inline alerts do not include a title or close capability and are considered minimally intrusive user messaging. |
| `iconName`  | unknown                          | DEPRECATED: Icon name used for the icon before to the field note                                                                                                                                                                                                                                                                                                                        |
| `fullWidth` | { type: Boolean, reflect: true } | Full width Inline Alert                                                                                                                                                                                                                                                                                                                                                                 |
| `iconTitle` | unknown                          | Icon title used for the icon alt text                                                                                                                                                                                                                                                                                                                                                   |
| `variant`   | unknown                          | Variant - **subtle** (default) renders an alert message in a padded container with a with a border and background color - **transparent** renders an alert message with no padded container, border, or background color                                                                                                                                                                |
| `status`    | { type: String }                 | Status - **default** renders an inline alert with the brand colors - **error** renders an inline alert with an error state - **warning** renders an inline alert with a warning state - **success** renders an inline alert with a success state - **attention** renders an inline alert with an attention state - **neutral** renders an inline alert with a nuetral state             |

### File Location

`packages/cre8-wc/components/inline-alert/inline-alert.module.ts`

---

## layout

### Properties

| Property  | Type    | Description                                                                                                                                                                                               |
| --------- | ------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `variant` | unknown |                                                                                                                                                                                                           |
| `variant` | unknown | Style variants <cre8-text-passage size="sm"> <ul> <li>Default is a right sidebar</li> <li>**left-sidebar** formats the first `layout-section` component as a left sidebar</li> </ul> </cre8-text-passage> |

### File Location

`packages/cre8-wc/components/layout/layout.module.ts`

---

## layout-container

### Properties

| Property     | Type                             | Description                                    |
| ------------ | -------------------------------- | ---------------------------------------------- |
| `fullHeight` | { type: Boolean, reflect: true } |                                                |
| `fullHeight` | { type: Boolean, reflect: true } | Full height variant 1) Sets the height to 100% |

### File Location

`packages/cre8-wc/components/layout-container/layout-container.module.ts`

---

## layout-section

### Properties

| Property   | Type    | Description                                                                                                                                                      |
| ---------- | ------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `behavior` | unknown |                                                                                                                                                                  |
| `behavior` | unknown | Behavioral variants - **sticky** allows the layout section to stick to the screen until the section reaches the bottom of the layout or the next layout section. |
| `top`      | unknown | Top style 1) Used to create dynamic sticky containers that can be adjusted based on the content                                                                  |

### File Location

`packages/cre8-wc/components/layout-section/layout-section.module.ts`

---

## linelength-container

### Overview

### File Location

`packages/cre8-wc/components/linelength-container/linelength-container.module.ts`

---

## link

### Properties

| Property            | Type              | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| ------------------- | ----------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `href`              | unknown           | Link Component are strictly used in the case where the component will take the user away from the current page to a new url. In this vein, this component should ONLY be used in situations an anchor tag would be used (an href is required) This goes for the variations as well such as the Call To Action Link **Note** For link with icon: - **iconRotateDegree** & **iconFlipDirection** props are optional. - They are used to set up the correct direction for icons, for example, arrows, caret up or caret down.                                           |
| `href`              | unknown           | Href attribute of the anchor tag                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| `rel`               | unknown           | Rel attribute of the anchor tag                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| `target`            | unknown           | Target attribute for a link (i.e. set to \_blank to open in new tab) - **\_blank** yields a link that opens in a new tab - **\_self** yields a link that loads the URL into the same browsing context as the current one. This is the default behavior - **\_parent** yields a link that loads the URL into the parent browsing context of the current one. If there is no parent, this behaves the same way as \_self - **\_top** yields a link that loads the URL into the top-level browsing context. If there is no parent, this behaves the same way as \_self. |
| `iconName`          | unknown           | DEPRECATED: Icon name, use svg instead                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| `svg`               | unknown           | svg as a raw string - For links with icon, the icon is defined by this prop. - Pass in a raw svg as a String for using <cre8-icon>                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| `iconRotateDegree`  | { type: Number }  | iconRotateDegree is used for <cre8-icon> to set the arrow in the correct direction                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| `iconFlipDirection` | unknown           | iconFlipDirection is used for <cre8-icon> to set the icon in the correct direction                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| `iconPosition`      | unknown           | Icon position - **before** places the icon before the button text - **after** places the icon after the button text                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| `ctaIcon`           | unknown           | Call To Action Icon                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| `ctaLink`           | { type: Boolean } | Call To Action Link                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| `noUnderline`       | { type: Boolean } | Link with no underline                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| `size`              | unknown           | Size variant (default is medium) - **sm** shrinks the link typography and overall size - **lg** increases the link typography size and overall size                                                                                                                                                                                                                                                                                                                                                                                                                  |
| `inverted`          | { type: Boolean } | Inverted colors Link (onDark)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |

### File Location

`packages/cre8-wc/components/link/link.ts`

---

## link-list

### Properties

| Property   | Type                             | Description                                                                                                                                                                                               |
| ---------- | -------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `behavior` | unknown                          |                                                                                                                                                                                                           |
| `behavior` | unknown                          | Behavioral variant - **responsive** renders a horizontal wrapping link list that converts to a stacked link list on large screens - **horizontal** renders a horizontal wrapping link list on all screens |
| `inverted` | { type: Boolean, reflect: true } | Inverted variant 1. Used for dark backgrounds                                                                                                                                                             |
| `size`     | unknown                          | Size variants - **sm** renders a link list with a smaller typography                                                                                                                                      |
| `spacing`  | unknown                          | Spacing between link list items - **condensed** renders a link list with a more compact display                                                                                                           |
| `variant`  | unknown                          | Style variants - **secondary** renders a link list with a more subtle visual treatment - **display** renders a link list with a display treatment (e.g. article title)                                    |

### File Location

`packages/cre8-wc/components/link-list/link-list.module.ts`

---

## link-list-item

### Properties

| Property   | Type                             | Description   |
| ---------- | -------------------------------- | ------------- |
| `text`     | unknown                          |               |
| `text`     | unknown                          | The link text |
| `isActive` | { type: Boolean, reflect: true } | Active link   |
| `href`     | unknown                          | The link URL  |

### File Location

`packages/cre8-wc/components/link-list-item/link-list-item.module.ts`

---

## list

### Properties

| Property  | Type    | Description                                                                                                                                                                                                                                                |
| --------- | ------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `variant` | unknown |                                                                                                                                                                                                                                                            |
| `variant` | unknown | Style variants <cre8-text-passage size="sm"> <ul> <li>**bare** removes any lines from in between list items</li> </ul> </cre8-text-passage>                                                                                                                |
| `spacing` | unknown | Spacing variants <cre8-text-passage size="sm"> <ul> <li>**padded** applies more padding in between list items compared to the default</li> <li>**condensed** reduces padding in between list items compared to the default</li> </ul> </cre8-text-passage> |

### File Location

`packages/cre8-wc/components/list/list.module.ts`

---

## list-item

### Overview

### File Location

`packages/cre8-wc/components/list-item/list-item.module.ts`

---

## loading-spinner

### Properties

| Property        | Type                             | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| --------------- | -------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `determinate`   | { type: Boolean, reflect: true } | A loading spinner notifies the user that their request is being processed while the front end is retrieving data or performing slow computations. Providing visibility of a system's status is one of the most important rules of UI design. When the user has to guess or assume that the system is responding to their input, they may send a command such as submit multiple times, while also being anxious that the application is frozen or not working. While it is most ideal to improve system performance such that there is no perceptible delay, in some cases this is not possible. In these cases, the immediate response should be a progress indicator to give a visual indication that their command was received and that the application is working. The length of time for the system response is a good general guideline for which progress indicator to use. ## Determinable vs indeterminate progress A progress meter provides feedback that the system is working and gives the user an indication of how much time they will wait. This indicator should be used when the system response time is longer and determinable. See ProgressMeter component for further examples and accessibility considerations. ## How to Use The loading-spinner component can be used to indicate loading state on the component level all the way up to the page level. There are two loading styles: determinate (loading progress represents percentage of total load time) and indeterminate (a spinning animation that persists while loading continues) 1. Choose determinate or indeterminate. UX best practices leans more towards recommending the indeterminate progress indicator if load time is unknown, while determinate is less user friendly unless the label indicates the percentage loaded as well. 2. Choose a size and use it according to context, guidance should be given by your design or content team. 3. A common label to use is `Loading…`, guidance should be given by your design content team. 4. If you choose to use the determinate loader then you must also control the progress attribute's value which controls the percentage of the circle that shows (values 0-100 accepted); 5. For dark backgrounds, add the `inverse` attribute to the `<cre8-loading-spinner>` tag. 6. For accessibility reasons, always include a label input unless explicitly informed to do otherwise by design or accessibility teams. 7. The lg variant is usually suitable for containers or block level loading placeholders while the sm size is meant for more inline loading states. |
| `determinate`   | { type: Boolean, reflect: true } | Mode of the spinner, defaults to indeterminate. If true, renders a standard progress indicator, fills via the progress property from 0% to 100%. If false or undefined, renders indeterminate spinner which animates in a spinning motion until component is destroyed.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| `inverse`       | { type: Boolean, reflect: true } | Inverse property used for dark backgrounds.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| `neutral`       | { type: Boolean, reflect: true } | Neutral property used for secondary neutral loading button.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| `buttonVariant` | unknown                          | Property that specifies which button variant is using the loading spinner                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| `label`         | unknown                          | Label to show along with progress indicator. This is required to meet accessibility requirements for this component.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| `progress`      | { reflect: true, type: Number }  | Progress to display, between 0 and 100. Requires determinate property to be set to true.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| `size`          | unknown                          | Size of the progress indicator and position of the label, if a label has been defined using the label property. - **large** renders a large progress indicator at 72px in width/height with the label below. - **small** renders a small progress indicator at 24px in width/height with the label to the right.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |

### File Location

`packages/cre8-wc/components/loading-spinner/loading-spinner.ts`

---

## logo

### Properties

| Property | Type    | Description |
| -------- | ------- | ----------- |
| `href`   | unknown |             |
| `href`   | unknown | Logo link   |

### File Location

`packages/cre8-wc/components/logo/logo.module.ts`

---

## main

### Properties

| Property     | Type                             | Description                                    |
| ------------ | -------------------------------- | ---------------------------------------------- |
| `fullHeight` | { type: Boolean, reflect: true } |                                                |
| `fullHeight` | { type: Boolean, reflect: true } | Full height variant 1) Sets the height to 100% |

### File Location

`packages/cre8-wc/components/main/main.module.ts`

---

## modal

### Properties

| Property            | Type                             | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| ------------------- | -------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `isActive`          | { type: Boolean, reflect: true } | Modal component should be used in all modal situations. It is natuarally composable and can even have a custom header and remove the close button. (note: adding `slot="header"` will insert the given element into the header section of the modal, same for `slot="footer"` and no given slot name will inset it into the body) If it is desired to create a utility modal. Cre8Modal requires a status value (see props table below, and a UtilityModalTitle since all utility modals have a cre8-heading) |
| `isActive`          | { type: Boolean, reflect: true } | Query the modal window                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| `isActive`          | { type: Boolean, reflect: true } | Is Active attribute                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| `status`            | unknown                          | Status Types <cre8-text-passage size="sm"> <ul> <li>**default (no value)** renders a default modal</li> <li>**error** renders an error modal</li> <li>**warning** renders a warning modal</li> <li>**success** renders a success modal</li> <li>**info** renders an info modal</li> <li>**help** renders an help modal</li> </ul> </cre8-text-passage>                                                                                                                                                        |
| `utilityModalTitle` | unknown                          | Utility Modal Heading (String)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| `notDismissible`    | { type: Boolean, reflect: true } | Not dismissible modal                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| `closeButtonText`   | unknown                          | Close Button Text                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| `closeButtonIcon`   | unknown                          | Close Button Icon                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| `ariaLabel`         | unknown                          | Modal Aria Label - This is required for accessibility and provides context of the entire modal!                                                                                                                                                                                                                                                                                                                                                                                                               |

### File Location

`packages/cre8-wc/components/modal/modal.module.ts`

---

## multi-select

### Properties

| Property                    | Type                             | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| --------------------------- | -------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `items`                     | { type: Array }                  | Multiselect is used when multiple options can be chosen from a static dropdown This component has a list of items in the dropdown that can be added as "selected tags" The checkbox will always reflect the selected nature of the item and is not removed from the dropdown when clicked, the tags will be added and removed based on their state. Event `selectedItemsChange` emits whenever a tag is added or remove from the list and the current list after the change is given in the detail.                  |
| `items`                     | { type: Array }                  | The list of string items the user can choose in the dropdown Note: For passing props containing arrays and complex types, you should pass the props using a period in from of the prop like so: `.items="[]"` (this is only needed for Web Components and not the React version)                                                                                                                                                                                                                                     |
| `preselectedItems`          | { type: Array }                  | The list of string items that are initially in the selected list of tags Note: This list MUST be a subset of the array of items to function. i.e. if items=['cat', 'dog', 'bird'], preselectedItems=['cat'] is valid while preselectedItems=['cat', 'goat'] is not and will break the component. Note: For passing props containing arrays and complex types, you should pass the props using a period in from of the prop like so: `.items="[]"` (this is only needed for Web Components and not the React version) |
| `label`                     | unknown                          | The required label that appears above the multiselect                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| `fieldId`                   | unknown                          | The unique id of the select                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| `fieldNote`                 | unknown                          | Optional field note text can be added to provide additional field guidance.                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| `ariaDescribedBy`           | unknown                          | Used to connect the field note in text field to the text menu for accessibility                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| `validationAriaDescribedBy` | unknown                          | Additional aria-describedby connection to id for additional success and error notes to be accessible                                                                                                                                                                                                                                                                                                                                                                                                                 |
| `disabled`                  | { type: Boolean, reflect: true } | The disabled attribute on the select                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| `isError`                   | { type: Boolean, reflect: true } | Changes the component's treatment to represent an error state                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| `errorNote`                 | unknown                          | The error field note that appears below the default field note                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| `isSuccess`                 | { type: Boolean, reflect: true } | Changes the component's treatment to represent a success state                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| `successNote`               | unknown                          | The success field note that appears below the default field note                                                                                                                                                                                                                                                                                                                                                                                                                                                     |

### File Location

`packages/cre8-wc/components/multi-select/multi-select.module.ts`

---

## nav-container

### Overview

### File Location

`packages/cre8-wc/components/nav-container/nav-container.module.ts`

---

## page-counter

### Properties

| Property       | Type                             | Description |
| -------------- | -------------------------------- | ----------- |
| `rangeVariant` | { type: Boolean, reflect: true } |             |

### File Location

`packages/cre8-wc/components/pagination/page-counter/page-counter.module.ts`

---

## page-header

### Properties

| Property  | Type             | Description       |
| --------- | ---------------- | ----------------- |
| `heading` | { type: String } |                   |
| `heading` | { type: String } | Page header title |

### File Location

`packages/cre8-wc/components/page-header/page-header.module.ts`

---

## pagination

### Properties

| Property                  | Type                             | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| ------------------------- | -------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `totalResults`            | { reflect: true, type: Number }  | The Pagination component is used to split up a large amount of results by showing only a certain amount on each page. You can cycle through the pages using Page Numbers, Next and Previous Buttons, or optional First Page and Last Page Buttons. This component is also used by Table to cycle through rows of results. Pagination has 3 display options: **default**: Can contain up to seven Page Numbers (ellipses included) at a time flanked by Next and Previous Buttons. When there are more than seven pages, numbers start getting replaced by ellipses. Use this option when you have a lot of horizontal space in a layout. It should not be used for mobile web layouts since its buttons are smaller than the minimum touch target of 44px. The component has built in responsivity to mobile page size so you dont have tohandle this seperately **compact** : Best used as a summary of where you are among pages or table rows flanked by Previous and Next Buttons. Use this option when you have limited horizontal space but still need to show where users are among results. Great for mobile layouts. **icon-only** : Use this option in very tight spaces when it’s not required to show users where they are among results. Great for mobile layouts. ## HOW TO USE Select an option from the “display” dropdown depending on layout width Select where your current page is from the “Page” dropdown To show less pages when using Full Numbers, use the "visiblePages” toggles To hide the First Page and Last Page Buttons, turn on the “hideFirstLastButton” toggle To change the states of page numbers or buttons, interact with the buttond to invoke each “State” When using Compact Numbers, you can choose between “compact” and “icon-only” formats ## ACCESSIBILITY NOTE To best orient people using screen readers, push focus to the top of the list of results after any of the pagination buttons have been triggered, **except for the currently selected one**. Focus target could be a visual results heading, or the top heading of the results container of the page selected via a programmatic selector, e.g. < section id=“results” aria-label="results-section" > or < div role= “group” aria-label=“results” >. |
| `totalResults`            | { reflect: true, type: Number }  | Input the total number of elements are returned from consuming app e.g. search results                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| `get`                     | { type: Number, reflect: true }  | how many elements will displayVariant per page, indicated by business to typically be 20                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            |
| `visiblePages`            | { reflect: true, type: Number }  | Controls how many page buttons are displayVarianted on the page at once, if container size permits. recommended max = 5 pages                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| `display`                 | { type: String, reflect: true }  | (optional) prop that allows for a compact and icon-only variant both for mobile screen-sizes and for use in certain contexts as guided by design, the component size will show 'default' in the absence of a value on desktop and 'compact' on smaller views.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| `hideLastAndFirstButtons` | { type: Boolean, reflect: true } |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| `hideLastAndFirstButtons` | { type: Boolean, reflect: true } |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |

### File Location

`packages/cre8-wc/components/pagination/pagination.ts`

---

## percent-bar

### Properties

| Property | Type    | Description                                                                                                                                                                                                                                                             |
| -------- | ------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `value`  | unknown | The percent bar visually indicates a user's current progress and has a few features: a basic display bar with a percentage, an actionable icon that allows a user to revisit a prior step and an actionable link that allows a user save their progress before exiting. |

### File Location

`packages/cre8-wc/components/percent-bar/percent-bar.module.ts`

---

## popover

### Properties

| Property            | Type                             | Description                                                                                                                                                                                                                                                                                                              |
| ------------------- | -------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `heading`           | unknown                          | The Popover is for progressive disclosure of relevant content often hidden behind a help or info icon. Its content should be no longer than 3-4 lines in addition to a line of heading text and an optional button.                                                                                                      |
| `heading`           | unknown                          | The heading text that appears at the top of the popover panel. Should only be 2-3 lines max. @attr {string \| undefined}                                                                                                                                                                                                 |
| `position`          | unknown                          | Positions the popover panel absolutely to the trigger - **default** positions the popover panel below the trigger - **top** positions the popover panel below the trigger - **left** positions the popover panel below the trigger - **right** positions the popover panel below the trigger @attr {string \| undefined} |
| `isVisibleOnScroll` | { type: Boolean, reflect: true } | Set to prevent the popover panel from hiding on scroll @attr {boolean \| undefined}                                                                                                                                                                                                                                      |
| `isDynamic`         | { type: Boolean, reflect: true } | The dynamic state for the popover - If true, the popover panel placement is determined by its position in the viewport - If false, the popover panel placement will be placed according to the position value @attr {boolean \| undefined}                                                                               |
| `isActiveDynamic`   | { type: Boolean, reflect: true } | The dynamic active state _This property is dynamically set_ @attr {boolean \| undefined}                                                                                                                                                                                                                                 |
| `isActive`          | { type: Boolean, reflect: true } | The active state for the popover - If true, the popover panel is visible - If false, the popover panel is hidden _This property is dynamically set_ @attr {boolean \| undefined}                                                                                                                                         |

### File Location

`packages/cre8-wc/components/popover/popover.module.ts`

---

## primary-nav

### Properties

| Property       | Type                             | Description                                                                                                                                                        |
| -------------- | -------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `inverted`     | { type: Boolean, reflect: true } |                                                                                                                                                                    |
| `inverted`     | { type: Boolean, reflect: true } | Inverted variant 1) Used for dark backgrounds                                                                                                                      |
| `behavior`     | unknown                          | Behavior variant <cre8-text-passage size="sm"> <ul> <li>**side-by-side** keeps the primary nav item always in a horizontal pattern</li> </ul> </cre8-text-passage> |
| `navAriaLabel` | unknown                          | aria-label attribute to designate at name for the nav. Can be override by user                                                                                     |

### File Location

`packages/cre8-wc/components/primary-nav/primary-nav.module.ts`

---

## primary-nav-item

### Properties

| Property   | Type                             | Description                                                   |
| ---------- | -------------------------------- | ------------------------------------------------------------- |
| `text`     | unknown                          |                                                               |
| `text`     | unknown                          | Primary nav item text                                         |
| `href`     | unknown                          | Primary nav item href                                         |
| `iconName` | unknown                          | Icon name                                                     |
| `megaMenu` | { type: Boolean, reflect: true } | Append to the class name. Used for passing in utility classes |

### File Location

`packages/cre8-wc/components/primary-nav-item/primary-nav-item.module.ts`

---

## progress-meter

### Properties

| Property  | Type    | Description                                                                                                                                                                                                                               |
| --------- | ------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `status`  | unknown | A progress meter provides feedback that the system is working and gives the user an indication of how much time they will wait. This indicator should be used when the system response time is longer and determinable.                   |
| `status`  | unknown | Progress Status - **Default** renders a meter with default status fill - **Error** renders a meter with an error status fill - **Warning** renders a meter with a warning status - **Success** renders a meter with a success status fill |
| `fieldId` | unknown | Progress Meter FieldId                                                                                                                                                                                                                    |
| `name`    | unknown | Progress Meter name                                                                                                                                                                                                                       |
| `label`   | unknown | Progress Meter label                                                                                                                                                                                                                      |

### File Location

`packages/cre8-wc/components/progress-meter/progress-meter.module.ts`

---

## progress-steps-item

### Properties

| Property  | Type    | Description                                                                                                                                                                                                                                   |
| --------- | ------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `message` | unknown | The Progress Steps Item component is used to display a single step in a multi-step process. It should be used as a child component of `cre8-progress-steps`. These Components serve a contextual purpose and don't provide any functionality. |
| `message` | unknown | Optional message to display under the step name.                                                                                                                                                                                              |
| `name`    | unknown | The name of the step.                                                                                                                                                                                                                         |
| `state`   | unknown | The state of the step: 'complete', 'current', 'error',' incomplete', 'warning';                                                                                                                                                               |
| `svg`     | unknown | An SVG string to use as the step icon.                                                                                                                                                                                                        |

### File Location

`packages/cre8-wc/components/progress-steps-item/progress-steps-item.ts`

---

## radio-field

### Properties

| Property            | Type                             | Description                                                                                                                                                                                                                                                                                                                                                                                  |
| ------------------- | -------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `fieldNote`         | unknown                          | Radio Field is the parent container for `radio-field-item`. It is required to allow for grouping numerous radio fields that need additional context (in the form of `<legend>`). It also provides accessibility roles, aria attributes and field note messaging on the group. See [radio-field-item](?path=/story/cre8-components-radio-field-item--default) for more guidance on its usage. |
| `fieldNote`         | unknown                          | Radio Field Note                                                                                                                                                                                                                                                                                                                                                                             |
| `ariaDescribedBy`   | unknown                          | Radio container fieldnote aria describe by                                                                                                                                                                                                                                                                                                                                                   |
| `fieldNoteIconName` | unknown                          | Radio container fieldnote icon name                                                                                                                                                                                                                                                                                                                                                          |
| `fieldNoteKnockout` | { type: Boolean, reflect: true } | Radio container fieldnote knockout                                                                                                                                                                                                                                                                                                                                                           |
| `isSuccess`         | { type: Boolean, reflect: true } | Radio container fieldnote isSuccess                                                                                                                                                                                                                                                                                                                                                          |
| `isError`           | { type: Boolean, reflect: true } | Radio container fieldnote isError                                                                                                                                                                                                                                                                                                                                                            |
| `label`             | unknown                          | Radio field legend label                                                                                                                                                                                                                                                                                                                                                                     |

### File Location

`packages/cre8-wc/components/radio-field/radio-field.module.ts`

---

## radio-field-item

### Properties

| Property            | Type                             | Description                                                                                                                                                                                                                                                                           |
| ------------------- | -------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `ariaDescribedBy`   | unknown                          | A Radio Field Item adds a radio button to a Radio Field. Radio buttons let a user choose only one of several options. Do not use a single radio button, because once selected, it cannot be de-selected. If the user can only choose one, none or many options, use Checkbox instead. |
| `ariaDescribedBy`   | unknown                          | Identifies the element that provides a detailed, extended description for the object.                                                                                                                                                                                                 |
| `checked`           | { type: Boolean, reflect: true } | A Boolean attribute which, if present, sets the radio button as selected.                                                                                                                                                                                                             |
| `disabled`          | { type: Boolean, reflect: true } | The Boolean disabled attribute, when present, makes the element not mutable, focusable, or even submitted with the form. The user can neither edit nor focus on the control, nor its form control descendants.                                                                        |
| `fieldId`           | unknown                          | Get the radio field item input                                                                                                                                                                                                                                                        |
| `fieldId`           | unknown                          | The fieldId attribute is assigned to the HTML input element of the radio button and the for attribute of the corresponding label.                                                                                                                                                     |
| `fieldNote`         | unknown                          | A FieldNote can be placed to provide guidance. It's frequently used to in the context of form fields for extra information or validation messages.                                                                                                                                    |
| `fieldNoteIconName` | unknown                          | Sets the item fieldnote icon. - **check** renders a badge with success state treatment - **error** renders a badge with error state treatment                                                                                                                                         |
| `fieldNoteKnockout` | { type: Boolean, reflect: true } | Radio item fieldnote knockout                                                                                                                                                                                                                                                         |
| `fieldNoteIsError`  | { type: Boolean, reflect: true } | Sets the error state of the fieldnote.                                                                                                                                                                                                                                                |
| `isError`           | { type: Boolean, reflect: true } | The isError attribute is used to indicate an error state related to the radio button.                                                                                                                                                                                                 |
| `isSuccess`         | { type: Boolean, reflect: true } | The isSuccess attribute is used to indicate a success state related to the radio button.                                                                                                                                                                                              |
| `label`             | unknown                          | The label attribute is used to assign a value to the label element corresponding to this radio button.                                                                                                                                                                                |
| `name`              | unknown                          | The name attribute is used to assign a value to the name attribute of the input element in the DOM.                                                                                                                                                                                   |
| `required`          | { type: Boolean, reflect: true } | Required attribute                                                                                                                                                                                                                                                                    |

### File Location

`packages/cre8-wc/components/radio-field-item/radio-field-item.module.ts`

---

## remove-tag

### Properties

| Property   | Type              | Description                                                                                                                                                                                                                                                                                                     |
| ---------- | ----------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `text`     | { type: String }  | Clicking a Remove Tag causes it to disappear from the page or field (in the case of Multi-Select). These tags always display a "Close" icon.                                                                                                                                                                    |
| `text`     | { type: String }  | The tag text                                                                                                                                                                                                                                                                                                    |
| `color`    | { type: String }  | The tag color scheme - **neutral** should be used when doing non-link actions such as filters or multi-select, within forms, etc. - **neutral-hybrid** should be used for when tags are doing an action like a button or a link - **branded** should be used like Neutral, but for marketing / actionable items |
| `shape`    | { type: String }  | The tag shape - **round** will give the tag a rounded border - **square** will give the tag a squared border                                                                                                                                                                                                    |
| `disabled` | { type: Boolean } | Disabled state for remove tag                                                                                                                                                                                                                                                                                   |

### File Location

`packages/cre8-wc/components/remove-tag/remove-tag.module.ts`

---

## section

### Properties

| Property   | Type    | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| ---------- | ------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `headline` | unknown | The section component acts as a block level HTML element that takes a 'headline' property that renders the section's heading which wraps around any HTML template that is found under this heading in the page layout. # How to Use 1. Use the headline attribute to create the section header, or if you need a more custom header there is a slot="header" that you can target for inserting a custom template. 2. For the main body contents, any html template can be placed inside the cre8-section component and will automatically render below the header. Note: for a section with a dark background please control this with the internal Components' inverted attributes. It could be a cre8-text-passage, a cre8-card or any other block level html. |
| `headline` | unknown | The Headline will be rendered as the Section Headline with the correct brand styling applied                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |

### File Location

`packages/cre8-wc/components/section/section.module.ts`

---

## select

### Overview

The Select control is designed and built to be used for selecting between choices in a form.
It is not a Dropdown control which is generally used for displaying lists of choices
that act as links or actions, like filter options.
Consider the use of a Select control carefully.
When you have less than 5 options for the user to choose from,
Radio or Checkbox inputs may be a better choice to display all of the options at once.
Users have to slow down to scan a list with more than 15 options,
so using an option group to give the options hierarchy may help users find their choice faster.
Alternately, a text input field might be a more appropriate control to use when there are too many options,
especially when used with typeahead/auto-complete.

## How to use

1. The collapsed default state always shows a default placeholder value or a selected value.
2. Sort list items in a logical order, such as grouping highly related options together,
   placing most common options first, using alphabetical or numeric orders or dates in chronological order.
3. A list that includes 6+ items should show a scrollbar.
4. Users should be able to use a keystroke to quickly jump
   to selecting an option that begins with the entered letter.
5. Utilize appropriate native controls for when a user is on a mobile device rather than our custom Select.
6. Adhere to our common form field conventions and always include a Label,
   provide short and clear error messages in context, avoid using the Read-only
   and Disabled states as much as possible, and utilize the info/formatting tip
   or helpful link rather than placeholder text.

### Properties

| Property                    | Type                             | Description                                                                                                                                                                                                                                                                                                             |
| --------------------------- | -------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `items`                     | { type: Array }                  | A mix of Cre8SelectOption and Cre8SelectOptionGroup definitions: - Cre8SelectOption - label: option label text - `string` - value: option value - `number \| string` - Cre8SelectOptionGroup - optGroupLabel: optgroup label text - `string` - options: Array of multiple Cre8SelectOption items - `Cre8SelectOption[]` |
| `label`                     | unknown                          | The required label that appears above the select                                                                                                                                                                                                                                                                        |
| `name`                      | unknown                          | The name property on the select                                                                                                                                                                                                                                                                                         |
| `fieldId`                   | unknown                          | The unique id of the select                                                                                                                                                                                                                                                                                             |
| `fieldNote`                 | unknown                          | Optional field note text can be added to provide additional field guidance.                                                                                                                                                                                                                                             |
| `ariaDescribedBy`           | unknown                          | Used to connect the field note in text field to the text menu for accessibility                                                                                                                                                                                                                                         |
| `validationAriaDescribedBy` | unknown                          | Additional aria-describedby connection to id for additional success and error notes to be accessible                                                                                                                                                                                                                    |
| `required`                  | { type: Boolean, reflect: true } | The required attribute on the select                                                                                                                                                                                                                                                                                    |
| `disabled`                  | { type: Boolean, reflect: true } | The disabled attribute on the select                                                                                                                                                                                                                                                                                    |
| `isError`                   | { type: Boolean, reflect: true } | Changes the component's treatment to represent an error state                                                                                                                                                                                                                                                           |
| `errorNote`                 | unknown                          | The error field note that appears below the default field note                                                                                                                                                                                                                                                          |
| `isSuccess`                 | { type: Boolean, reflect: true } | Changes the component's treatment to represent a success state                                                                                                                                                                                                                                                          |
| `successNote`               | unknown                          | The success field note that appears below the default field note                                                                                                                                                                                                                                                        |

### File Location

`packages/cre8-wc/components/select/select.module.ts`

---

## select-tile

### Overview

This Controller handles the special checkbox logic.
This should be a lot simpler than the radio version.
See https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles/checkbox_role

### Properties

| Property                 | Type                                                   | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| ------------------------ | ------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `type`                   | { reflect: true }                                      | The Select Tile component is a short block of content inside a visual container that can be used in place of checkboxes, radio buttons, and links. It allows you to add more descriptive and visually appealing content for these actions while letting you compare different choices either side-by-side or on top of each other. Typically you could use the "header" slot for an icon, and the "title" and "body" slots for a content title and body text below it. The css parts are shown here wrapped in ::part() because otherwise Storybook won't render them and the slots if they have the same name. See https://developer.mozilla.org/en-US/docs/Web/CSS/::part Consider using title and body instead. instead of the default slot for appropriate typography. the title slot and receives apporpriate typography. |
| `type`                   | { reflect: true }                                      | Should this Select Tile behave as a radio button or a checkbox?                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| `variant`                | { reflect: true }                                      | Style variants - **bare** renders a select-tile without a border and without padding around the content - **horizontal** renders a select-tile with header, body, footer oriented in a row rather than a column - **horizontal-bare** renders a select-tile with header, body, footer oriented in a row rather than a column without a border and without padding around the content                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| `variantBreakToVertical` | { reflect: true }                                      | Which breakpoint, if any, to switch to verticial. Only useful for horizontal variants. Defaults to 'sm'.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| `checkPosition`          | { reflect: true }                                      | Where does the checkmark or radio button go? It disappears on 'none'. Only top-right is supported for vertical variants.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| `radioVariant`           | { reflect: true }                                      | In radio mode, whether to use the circle with the dot, or the rounded check.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| `align`                  | { reflect: true }                                      | Align variants <cre8-text-passage size="sm"> <ul> <li>**center** renders a select-tile that has center aligned content/text</li> </ul> </cre8-text-passage>                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| `isError`                | { type: Boolean, reflect: true }                       | Error State                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| `disabled`               | { type: Boolean, reflect: true }                       | Disabled State                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| `required`               | { type: Boolean, reflect: true }                       | Required attribute                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| `checked`                | { type: Boolean, reflect: true }                       | Checked State. Note: the `checked` attribute sets the `defaultChecked` property, as well as sets the initial value for the `checked` property.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| `defaultChecked`         | { attribute: 'checked', type: Boolean, reflect: true } | The default checked state when the element first renders or is reset. Note: the attribute is named `checked` and the property is named `defaultChecked`. This is the same as a regular radio button.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| `fieldId`                | unknown                                                | Select Tile FieldId                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            |
| `name`                   | { reflect: true }                                      | Name of the form control.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| `private`                | unknown                                                | Radio item fieldnote aria describe by                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| `isSuccess`              | { type: Boolean, reflect: true }                       | Radio item fieldnote isSuccess                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |

### Methods

#### `wrapIndex()`

Helper function to wrap indexes around, to help us treat the array as a ring.

### File Location

`packages/cre8-wc/components/select-tile/select-tile-checkbox-controller.ts`

---

## select-tile-list

### Properties

| Property             | Type                             | Description                                                                     |
| -------------------- | -------------------------------- | ------------------------------------------------------------------------------- |
| `variant`            | { reflect: true }                | Select Tile List is a container design to hold multiple Select Tile Components. |
| `variant`            | { reflect: true }                | Whether to show the tiles side by side (columns) or stacked vertically (rows).  |
| `label`              | { reflect: true }                | Select Tile container label                                                     |
| `fieldNote`          | { reflect: true }                | Select Tile container fieldnote                                                 |
| `ariaDescribedBy`    | unknown                          | Select Tile container fieldnote aria describe by                                |
| `fieldNoteIconName`  | { reflect: true }                | Select Tile container fieldnote icon name                                       |
| `fieldNoteKnockout`  | { type: Boolean, reflect: true } | Select Tile container fieldnote knockout                                        |
| `fieldNoteIsSuccess` | { type: Boolean, reflect: true } | Select Tile container fieldnote isSuccess                                       |
| `fieldNoteIsError`   | { type: Boolean, reflect: true } | Select Tile container fieldnote isError                                         |

### File Location

`packages/cre8-wc/components/select-tile-list/select-tile-list.module.ts`

---

## skeleton-loader

### Properties

| Property  | Type    | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| --------- | ------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `variant` | unknown | Skeleton Loader allows for the ability to create placeholder UI loading states. Developers are encouraged to pass into the Skeleton Loader their own parameters to create simple (or complex) loading screens. ## How to Use Skeleton states are simplified versions of components used on an initial page load to indicate that the information on the page has not fully loaded yet. They only appear for only a few seconds, disappearing once components and content populate the page. These loaders use motion to convey that the page is not stuck and that data is still being loaded. This can help to reduce user uncertainty. Skeleton objects should generally be visualized by simple primitives which mimic the original content in a recognizable way. It is recommended to use a more elaborate form if that is needed to make the component recognizable. Never represent toast notifications, overflow menus, dropdown items, modals, and loaders with skeleton states. Elements inside a modal may have a skeleton state, but the modal itself should not. **IMPORTANT!** This is not a loading element and will provide no value to a screen reader user, this is a decorative element only! |
| `variant` | unknown | Style variant - **rectangle** renders a featureless rectangle as a placeholder for loading elements - **square** renders a featureless square as a placeholder for loading elements - **circle** renders a featureless circle as a placeholder for loading elements                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| `height`  | unknown | Height inline style 1. Used to set a height on the skeleton if specific size is needed                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| `width`   | unknown | Width inline style 1. Used to set a width on the skeleton if specific size is needed                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             |

### File Location

`packages/cre8-wc/components/skeleton-loader/skeleton-loader.module.ts`

---

## split-button

### Properties

| Property     | Type                             | Description                                                                                                                                                                                                     |
| ------------ | -------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `disabled`   | { type: Boolean, reflect: true } |                                                                                                                                                                                                                 |
| `size`       | unknown                          | Size variant <cre8-text-passage size="sm"> <ul> <li>**sm** shrinks the button typography and overall size</li> <li>**lg** increases the button typography size and overall size</li> </ul> </cre8-text-passage> |
| `buttonText` | unknown                          | Display text on the button                                                                                                                                                                                      |

### File Location

`packages/cre8-wc/components/split-button/split-button.module.ts`

---

## submenu

### Overview

### File Location

`packages/cre8-wc/components/submenu/submenu.module.ts`

---

## submenu-item

### Properties

| Property | Type    | Description  |
| -------- | ------- | ------------ |
| `href`   | unknown |              |
| `href`   | unknown | The link URL |

### File Location

`packages/cre8-wc/components/submenu-item/submenu-item.module.ts`

---

## tab

### Properties

| Property         | Type                             | Description                                                                                                                                                                                                |
| ---------------- | -------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `size`           | unknown                          |                                                                                                                                                                                                            |
| `size`           | unknown                          | Tab sizes - **default** displays the tab text with cre8-typography-label-default - **sm** displays the tab text with cre8-typography-label-small and decrease padding _\*This property is dynamically set_ |
| `isActive`       | { type: Boolean, reflect: true } | If is true, tab has active state and cooresponding tab panel is visible. _\*This property is dynamically set_                                                                                              |
| `index`          | { type: Number }                 | Used to align the tab with the tab panel _\*This property is dynamically set_                                                                                                                              |
| `ariaLabelledBy` | unknown                          | Used to connect tab trigger and tab panel for accessibility _\*This property is dynamically set_                                                                                                           |

### File Location

`packages/cre8-wc/components/tab/tab.module.ts`

---

## tab-panel

### Properties

| Property           | Type                             | Description                                                                              |
| ------------------ | -------------------------------- | ---------------------------------------------------------------------------------------- |
| `skipFocusOnPanel` | { type: Boolean, reflect: true } |                                                                                          |
| `skipFocusOnPanel` | { type: Boolean, reflect: true } | This will remove focus on panel element                                                  |
| `isActive`         | { type: Boolean, reflect: true } | Indicates if the panel is active <br/><br/> _\*This property is dynamically set_         |
| `index`            | { type: Number }                 | Used to align the tab panel with the tab <br/><br/> _\*This property is dynamically set_ |

### File Location

`packages/cre8-wc/components/tab-panel/tab-panel.module.ts`

---

## table

### Properties

| Property      | Type                             | Description                                                                                                                                                                |
| ------------- | -------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `caption`     | unknown                          |                                                                                                                                                                            |
| `caption`     | unknown                          | Specifies the caption/title of the table, visible to all users. Increases accessibility of table.                                                                          |
| `behavior`    | unknown                          | Behavior variants <cre8-text-passage size="sm"> <ul> <li>**responsive** stacks column headers with respective table cells on small screens</li> </ul> </cre8-text-passage> |
| `isHoverable` | { type: Boolean, reflect: true } | Hoverable rows variant 1) Allows the table rows to be styled on hover                                                                                                      |
| `variant`     | unknown                          | Style variants <cre8-text-passage size="sm"> <ul> <li>**striped** add zebra-striping to table rows within the `<tbody>`</li> </ul> </cre8-text-passage>                    |

### File Location

`packages/cre8-wc/components/table/table.module.ts`

---

## table-body

### Overview

### File Location

`packages/cre8-wc/components/table-body/table-body.module.ts`

---

## table-cell

### Properties

| Property     | Type             | Description                                                                                                                          |
| ------------ | ---------------- | ------------------------------------------------------------------------------------------------------------------------------------ |
| `colspan`    | { type: Number } |                                                                                                                                      |
| `colspan`    | { type: Number } | Colspan attribute on td                                                                                                              |
| `variant`    | unknown          | Style variants <cre8-text-passage size="sm"> <ul> <li>**bare** renders a table cell without a border</li> </ul> </cre8-text-passage> |
| `dataHeader` | unknown          | Column header text for cell to display when table is using responsive variant                                                        |

### File Location

`packages/cre8-wc/components/table-cell/table-cell.module.ts`

---

## table-header

### Overview

### File Location

`packages/cre8-wc/components/table-header/table-header.module.ts`

---

## table-header-cell

### Properties

| Property | Type    | Description                                               |
| -------- | ------- | --------------------------------------------------------- |
| `public` | unknown |                                                           |
| `public` | unknown | Colspan attribute on th                                   |
| `public` | unknown | Adds inline width style to th Sets width of entire column |

### File Location

`packages/cre8-wc/components/table-header-cell/table-header-cell.module.ts`

---

## table-object

### Overview

### File Location

`packages/cre8-wc/components/table-object/table-object.ts`

---

## table-row

### Properties

| Property              | Type                             | Description                                                                                                                         |
| --------------------- | -------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------- |
| `isExpanded`          | { type: Boolean, reflect: true } |                                                                                                                                     |
| `isExpanded`          | { type: Boolean, reflect: true } | Visually show additional expandable content                                                                                         |
| `isExpandable`        | { type: Boolean, reflect: true } | Indicates row has additional visually hidden related content                                                                        |
| `variant`             | unknown                          | Style variants <cre8-text-passage size="sm"> <ul> <li>**bare** renders a table row without a border</li> </ul> </cre8-text-passage> |
| `expandedButtonText`  | unknown                          | Expanded button text                                                                                                                |
| `collapsedButtonText` | unknown                          | Expand button text                                                                                                                  |

### File Location

`packages/cre8-wc/components/table-row/table-row.module.ts`

---

## tabs

### Properties

| Property      | Type                             | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| ------------- | -------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `size`        | unknown                          | Tabs are used to quickly navigate back and forth between views. The Tab design and interaction varies depending on the requirements for your organization and project. Standardizing on the best individual controls will improve usability and reduce development and QA time. Create a standard set of Tab controls: Primary Tabs (for system navigation), Secondary Tabs (for sub navigation within a screen). ## Usability Guidelines - The selected Tab should be visually differentiated from the other Tabs. The deselected Tabs should still look enabled. Dimming the other Tabs decreases the legibility of items that are actually active and clickable. - There must be a minimum of 2 Tabs. - Showing status in a Tab is non-standard (such as 0%, 10%). - Tab labels and content should be parallel, with the exception of a Summary or Overview Tab which can be a rollup of content across other Tabs. - Keep the font size of the Tabs the same. If the Tabs are a fixed width and one of the labels is too long, don't resize the text to fit and consider wrapping text to a second line. - If possible, don't truncate text because it makes it harder to understand what's in the Tab. - Try not to use more than six Tabs to keep the UI uncluttered. - Do not stack Tabs on top of each other, and do not nest Tabs within Tabs. Find alternate ways of navigating page hierarchy. |
| `size`        | unknown                          | Tab sizes - **default** displays the cre8-tab text with cre8-typography-label-default - **sm** displays the cre8-tab text with cre8-typography-label-small                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| `fullWidth`   | { type: Boolean, reflect: true } | Displays a set of tabs with a spanning the width of the element                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| `activeIndex` | { type: Number }                 | Auto Increment id to sync tab and tab panel _\*This property is dynamically set_                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| `activeIndex` | { type: Number }                 | Sets the initial active tab (e.g. 0 sets the first tab, 1 sets the second tab, etc.)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |

### File Location

`packages/cre8-wc/components/tabs/tabs.module.ts`

---

## tag

### Properties

| Property  | Type    | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| --------- | ------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `text`    | unknown | The tag component allows you to make selections, filter content, or trigger actions. While buttons are expected to appear consistently and with familiar calls to actions, tags should appear dynamically as a group of multiple interactions elements. It is a flexible component that comes in the following types: - **radio** Clicking a Radio Button causes it to change color. These tags only allow one option to be chosen and can be used in place of radio button when they need to be listed horizontally - **checkbox** It allows for selecting options, It can be toggled on and off. |
| `type`    | unknown | Type of tag **checkbox** renders a checkbox tag **radio** renders a radio tag                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| `variant` | unknown | Color variant **neutral** renders the default, unselected tag **branded** renders a selected tag **neutral-hybrid** renders a tag when mouse is hovering tag                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| `shape`   | unknown | shape of the tag, supports square and round, and default not mentioned its a square                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| `fieldId` | unknown | Get the radio field item input                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| `fieldId` | unknown | The fieldId attribute is assigned to the HTML input element of the radio button and the for attribute of the corresponding label.                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |

### File Location

`packages/cre8-wc/components/tag/tag.ts`

---

## tag-list

### Properties

| Property  | Type    | Description                                                                                                                                                                                                                                                               |
| --------- | ------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `label`   | unknown | Tag List must have children which are Tag components that are of type `checkbox` or `radio`. The Tags must use the `neutral` variant and the `round` shape when they are inside a Tag List. Tag List has a label that should be used to describe the purpose of the list. |
| `label`   | unknown | Tag list legend label                                                                                                                                                                                                                                                     |
| `fieldId` | unknown | The unique id of the select                                                                                                                                                                                                                                               |

### File Location

`packages/cre8-wc/components/tag-list/tag-list.module.ts`

---

## tertiary-nav

### Properties

| Property       | Type                             | Description                                                                    |
| -------------- | -------------------------------- | ------------------------------------------------------------------------------ |
| `fullWidth`    | { type: Boolean, reflect: true } |                                                                                |
| `fullWidth`    | { type: Boolean, reflect: true } | Allows the tertiary nav to take up the full width of it parent container       |
| `navAriaLabel` | unknown                          | aria-label attribute to designate at name for the nav. Can be override by user |

### File Location

`packages/cre8-wc/components/tertiary-nav/tertiary-nav.module.ts`

---

## tertiary-nav-item

### Properties

| Property    | Type                             | Description                                |
| ----------- | -------------------------------- | ------------------------------------------ |
| `href`      | unknown                          |                                            |
| `href`      | unknown                          | The href value of the tertiary nav link    |
| `isCurrent` | { type: Boolean, reflect: true } | The current state of the tertiary nav link |

### File Location

`packages/cre8-wc/components/tertiary-nav-item/tertiary-nav-item.module.ts`

---

## text-link

### Properties

| Property   | Type                             | Description                                                                                                                                                                                                                                                            |
| ---------- | -------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `href`     | unknown                          |                                                                                                                                                                                                                                                                        |
| `href`     | unknown                          | The link URL                                                                                                                                                                                                                                                           |
| `variant`  | unknown                          | Style variant <cre8-text-passage size="sm"> <ul> <li> **display** applies display treatment to the text link (e.g. article title link)</li> <li> **secondary** applies secondary treatment to the text link (e.g. non-prominent links)</li> </ul> </cre8-text-passage> |
| `size`     | unknown                          | Size variant <cre8-text-passage size="sm"> <ul> <li> **sm** renders a smaller typography preset than the default</li> </ul> </cre8-text-passage>                                                                                                                       |
| `inverted` | { type: Boolean, reflect: true } | Inverted variant 1) Used for dark backgrounds                                                                                                                                                                                                                          |

### File Location

`packages/cre8-wc/components/text-link/text-link.module.ts`

---

## text-passage

### Properties

| Property   | Type                             | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| ---------- | -------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `inverted` | { type: Boolean, reflect: true } | The text-passage component acts a general wrapper element for any text content that needs to be used in your project. # How to Use 1. Code your text passage using any of the native html text elements (p, ol, ul, blockquote, cite, etc.) or other Cre8 Components like cre8-heading and wrap them with the cre8-text-passage tags. 2. Choose between three sizes for your text content or apply inline styling if you need additional styling. 3. For dark backgrounds, add the 'inverted' attribute to the <cre8-text-passage> tag. 3. Your text-passage will render with brand-approved styling! NOTE: It is recommended that you use the cre8-heading component for any heading elements in your HTML template |
| `inverted` | { type: Boolean, reflect: true } | Inverted variant 1) Used for dark backgrounds                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| `size`     | unknown                          | Size variant - **small** renders smaller typography than the default variant - **default** renders default typography variant - **large** renders larger typography than the default variant                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |

### File Location

`packages/cre8-wc/components/text-passage/text-passage-light-dom.module.ts`

---

## tooltip

### Overview

The purpose of tooltips is to provide a tip or hint about what a tool, icon, link, or other interaction does.
If you need to present a call to action with perhaps a button for the user to click, then use
[Popover](/docs/cre8-components-popover--docs) instead.
##Tooltip Styles
There are 4 alignment options for Tooltips: Top, Bottom, Right, and Left. Default placement is Bottom, below the
element it is describing. Top or Bottom alignment are the the preferred placement, particularly on screens that
have a more narrow viewport. Tooltips utilize Global styles and are not affected by brand themes.
**With icon**

- **iconRotateDegree** & **iconFlipDirection** props are optional.
- They are used to set up the correct dirrection for icons, for example,
  arrows, caret up or caret down.
  ##Usability Considerations
  With the exception of icons - which should always have alt text at a minimum - the UI should never rely on
  Tooltips for clarity, especially because they are not always discovered by the user. If the user cannot
  intuitively understand the interface without Tooltips, the interface should be redesigned.
  ##How to use
- Use Tooltips to clarify the UI element the user is interacting with, not to add additional content on the page.
  Also, do not simply restate content on the page, for example, the title of the field.
- Tooltips should be short and to the point. Example: "Click X to do X" or "Icon Description." If a succinct
  description is not possible, the interaction element should be redesigned.
- In a mouse-driven UI, Tooltips are triggered on hover (mouseover) and dismissed (disappear)
  when the user mouses away from the element. In touch UIs, a Tooltip is triggered by tapping
  and holding an item. The Tooltip is displayed as long as the user continues to hold the element.
  Tap and hold is a more advanced user behavior, and further reason for not relying on Tooltips.
  A novice user may never discover tap and hold for Tooltips.

### Properties

| Property            | Type                             | Description                                                                                                                                                                                                                                                                                                                                                     |
| ------------------- | -------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `position`          | unknown                          | Positions the tooltip panel absolutely to the icon. Position overrides `isDynamic`. - **default** positions the tooltip panel below the trigger element - **top** positions the tooltip panel above the trigger element - **left** positions the tooltip panel left of the trigger element - **right** positions the tooltip panel right of the trigger element |
| `knockout`          | { type: Boolean, reflect: true } | The knockout variant for the tooltip 1. If is true, the tooltip background is white 2. If is false, the tooltip background is gray                                                                                                                                                                                                                              |
| `isDynamic`         | { type: Boolean, reflect: true } | The dynamic state for the tooltip. Position overrides isDynamic. - If true, the tooltip panel placement is determined by its position in the viewport - If false, the tooltip panel placement will be placed according to the position value                                                                                                                    |
| `isActiveDynamic`   | { type: Boolean }                | The dynamic active state <br/><br/> _\*This property is dynamically set_                                                                                                                                                                                                                                                                                        |
| `isActive`          | { type: Boolean, reflect: true } | The active state for the tooltip - If true, the tooltip panel is visible - If false, the tooltip panel is hidden <br/><br/> _\*This property is dynamically set_                                                                                                                                                                                                |
| `ariaDescribes`     | { type: String }                 | Accepts the ID string of the item the tooltip is referencing @attr {string} Dynmically appends its own ID to the aria-describedby attribute on the referenced element                                                                                                                                                                                           |
| `svg`               | unknown                          | svg as a raw string - The icon is defined by this prop. - Pass in a raw svg as a String for using <cre8-icon>                                                                                                                                                                                                                                                   |
| `iconRotateDegree`  | { type: Number }                 | iconRotateDegree is used for <cre8-icon> to set the arrow in the correct direction                                                                                                                                                                                                                                                                              |
| `iconFlipDirection` | unknown                          | iconFlipDirection is used for <cre8-icon> to set the icon in the correct direction                                                                                                                                                                                                                                                                              |

### File Location

`packages/cre8-wc/components/tooltip/tooltip.module.ts`

---

## utility-nav

### Properties

| Property       | Type                             | Description                                                                    |
| -------------- | -------------------------------- | ------------------------------------------------------------------------------ |
| `inverted`     | { type: Boolean, reflect: true } |                                                                                |
| `inverted`     | { type: Boolean, reflect: true } | Inverted variant 1) Used for dark backgrounds                                  |
| `navAriaLabel` | unknown                          | aria-label attribute to designate at name for the nav. Can be override by user |

### File Location

`packages/cre8-wc/components/utility-nav/utility-nav.module.ts`

---

## utility-nav-item

### Properties

| Property       | Type                             | Description                                                                                                                                                                       |
| -------------- | -------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `hideText`     | { type: Boolean, reflect: true } | Hide text toggle 1) Visually hides the text so screenreaders can still read for accessibility when set to true.                                                                   |
| `href`         | unknown                          | URL of the utility nav item                                                                                                                                                       |
| `iconName`     | unknown                          | Icon name                                                                                                                                                                         |
| `iconPosition` | unknown                          | Icon position <cre8-text-passage size="sm"> <ul> <li>**before** places the icon before the text</li> <li>**after** places the icon after the text</li> </ul> </cre8-text-passage> |
| `text`         | unknown                          | Text of the utility nav item                                                                                                                                                      |

### File Location

`packages/cre8-wc/components/utility-nav-item/utility-nav-item.module.ts`

---

## Appendix

### Generation Information

- **Script:** JSDoc Documentation Collector
- **Timestamp:** 2025-08-06T02:27:16.307Z
- **Total Files Processed:** 215
- **Components Found:** 52
- **Properties Documented:** 434
- **Methods Documented:** 1

### Usage Guidelines for LLMs

This documentation is structured to be easily consumed by Large Language Models. Key features:

- **Hierarchical Structure:** Components are grouped logically
- **Property Tables:** Easy-to-scan property information
- **Type Information:** Comprehensive type annotations
- **Usage Examples:** Practical implementation examples
- **Cross-References:** Links between related components
