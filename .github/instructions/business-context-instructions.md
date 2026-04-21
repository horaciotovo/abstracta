# Business context

Use the product's business language in test names, comments, and assertions.

Required reasoning before creating or fixing tests:
- Identify the user role involved.
- Identify the business outcome being validated.
- Distinguish critical-path flows from low-risk convenience flows.
- Prefer validating user value and permission boundaries over implementation details.

Model the product using these concepts when applicable:
- Tenant / Organization: top-level customer boundary
- Workspace / Project: scoped work area inside the tenant
- Admin: elevated permissions and configuration access
- Standard user / Member: day-to-day operational access
- Read-only user / Viewer: visibility without mutation rights

High-priority scenarios:
- Authentication and session continuity
- Authorization and permission boundaries
- User invitations and role management
- Creation, editing, and deletion of core business entities
- Audit or history visibility for important actions
- Approval, review, or publish workflows
- Error handling and recovery for failed actions

Test generation rules:
- Favor business outcomes over UI mechanics.
- For permissions, validate both allowed and denied behavior.
- For destructive actions, confirm both action success and post-action state.
- For workflows with statuses, assert meaningful state transitions.
- When possible, validate persisted outcomes using existing helpers or visible end-state evidence.

If business context is missing in the prompt:
- Infer it from neighboring tests, page objects, fixtures, and route names.
- Do not invent product terminology that conflicts with the codebase.