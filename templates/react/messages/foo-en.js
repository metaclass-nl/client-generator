export default {
{{#each fields}}
  "{{{../lc}}}.{{{name}}}": "{{{capitalize name}}}",{{#if description}}
  "{{{../lc}}}.{{{name}}}.placeholder": "{{{description}}}",{{/if}}
{{/each}}

  "{{{lc}}}.list": "{{{title}}} List",
  "{{{lc}}}.new": "New {{{title}}}",
  "{{{lc}}}.show": "Show {label}",
  "{{{lc}}}.create": "Create",
  "{{{lc}}}.update": "Edit {label}",
  "{{{lc}}}.delete.confirm": "Are you sure you want to delete this {{{title}}}?",
  "{{{lc}}}.created": "{label} created.",
  "{{{lc}}}.updated": "{label} updated.",
  "{{{lc}}}.mercure_deleted": "{label} has been deleted by another user."
}