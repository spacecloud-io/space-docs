---
title: "Configuring Rules"
description: "Configuring Rules"
date: 2020-10-22T13:26:00+05:30
draft: false
weight: 1
---

Security rules in Space Cloud work at a very granular level for all the APIs. Mission Control (Admin UI of Space Cloud) comes packed with an easy to use Rule Builder UI as well as a JSON editor to construct security rules.

## Securing different APIs

### Database CRUD APIs

The security rules for CRUD APIs of the database module can be configured at the operation (`create`, `read`, `update`, `delete`) level for each table of each database.

To configure the security rules of a table, head over to the `Database` section of the mission control. Select the desired database from the database selector. You should be able to see all the tracked tables in the `Overview` tab as in the image above.

![Securing CRUD APIs](/images/screenshots/tracked-tables.png) 

Just click the `Secure` button for the required table from the `Actions` column. This will open the page for configuring security rules of that table:

![Rule Builder](/images/screenshots/rule-builder.png) 

**Configuring default rules:**

If a security rule is not configured for a particular operation of any table, then the default security rules for that operation are used. Default security rules are configured at the operation level for each database.

To configure the default security rules of a database, head over to the `Settings` tab of the `Database` section. Click on the `Configure` button in the `Default rules for tables/collections` section.   

![DB Settings](/images/screenshots/db-settings.png) 

### Database Prepared Queries

The security rules for prepared queries of the database module can be configured for each prepared query that you write.

To configure the security rules of a prepared query, head over to the `Prepared Queries` tab in the `Database` section of the mission control.

![Securing Prepared Querues](/images/screenshots/prepared-queries.png) 

Just click the `Secure` button for the required prepared query from the `Actions` column. This will open the page for configuring security rules of that prepared query.

**Configuring default rules:**

If a security rule is not configured for one of the prepared queries, then the default security rules for prepared queries of that database will be used.

To configure the default security rules of the prepared queries of a database, head over to the `Settings` tab of the `Database` section. Click on the `Configure` button in the `Default rules for prepared queries` section. 

![DB Settings](/images/screenshots/db-settings.png)
 
### Filestore APIs

The APIs for the file storage module can be configured at the operation (`create`, `read`, `delete`) level for each path prefix. This means that you can have different rules for different path prefixes. 

Here's a sample snippet which shows the rules on the `/images/:userId` prefix. Operations `create` and `read` are allowed while `delete` is blocked.

{{< highlight javascript >}}
{
  "prefix": "/images/:userId",
  "rule": {
    "create": {
      "rule": "allow"
    },
    "read": {
      "rule": "allow"
    },
   "delete": {
      "rule": "deny"
    }
  }
}
{{< /highlight >}}

**Points to note**

The following points need to be kept in mind for the security rules in the file storage module:

- All rules are applied to a prefix. A prefix is nothing but the path prefix where the file/folder is present or is to be created.
- The prefix may contain path parameters (e.g. `/:userId` in the above example). The value of the path parameter is available in the `args.params` object. For the above example, `userId` field would be available in the `args.params` object with the value being the actual value provided in the path for that `userId` path parameter.

To configure the security rules of file storage, head over to the `File Storage` section of the Mission Control. Click on the `Add` button to add a security rule:

![Adding FileStore Rule](/images/screenshots/add-filestore-rule.png) 

Enter the path prefix for the files/folders that you want to secure. As discussed above, the prefix can contain path parameters. The default security rules would be prefilled for you. You can change it now or even later with the Rule Builder or the JSON editor.

Give the rule a name. This name is for you to identify the rule later.

To modify a rule, click the `Secure` button from the `Actions` table:

![Filestore rules](/images/screenshots/filestore-rules.png) 

**Configuring default security rules**

You can have a fallback rule for the API calls that don't match any of the path prefixes of your configured rules. A default rule in the file storage module is nothing but a rule configured for the `/` path prefix. Whenever you configure the file storage module for the first time, a default rule is configured for you with the name `Default Rule`. You can edit this rule as per your needs.

### Remote Services

The security rules for remote services are configured at the endpoint level for each remote service. 

To configure the security rules of an endpoint, head over to the `GraphQL API` section of the Mission Control. Click the `View` action of the required remote service:

![Remote services](/images/screenshots/remote-services.png)

You will be directed to a page which will show all the endpoints of that remote service. Click the `Secure` action next to any of the endpoint that you wish to secure.

![Remote Endpoints](/images/screenshots/remote-endpoints.png)

### Ingress Routes

The security rules for the ingress routes are configured at the route level, i.e. you write security rules for each ingress route that you have created. 

To configure the security rules of an ingress route, head over to the `Ingress Routes` section. Click on the `Secure` action next to any ingress route.

![Ingress Routes](/images/screenshots/ingress-routes.png)


### Custom Events

The security rules for custom events are configured at the event type level. You can create multiple event triggers
for a single custom event type. However, you need to write the security rules only for the custom event types and not the triggers.

To configure the security rules for the custom event types, head over to the `Rules` tab in the `Eventing` section of the Mission Control. Click on the `Add` button to open the following modal:

![Add Eventing Rule](/images/screenshots/add-eventing-rule.png)

Enter the event type that you want to secure. The default security rules would be prefilled for you. You can change it now or even later with the Rule Builder or the JSON editor.

To modify a rule, click the `Secure` button from the `Actions` table:

![Eventing Rules](/images/screenshots/eventing-rules.png) 

## Using the Security Rule Builder

There are two ways to use Space Cloud's security rules:

- Using the JSON Editor
- Using the Rule Builder

Space Cloud's security rules are simple JSON objects. The JSON Editor allows you to type the JSON rules directly. To use the JSON Editor, switch to the `JSON` tab in the security rules page:

![JSON Editor](/images/screenshots/json-rule-editor.png)

However, to make things easier, Mission Control comes with a graphical Rule Builder that is selected by default:

![Rule Builder](/images/screenshots/rule-builder.png)

To configure any rule, double click on any block, This will open a side panel, where you can change the rule type and/or any other config related to a rule.

![Rule Builder Form](/images/screenshots/rule-builder-form.png)

Complex rules can be built by adding clauses inside `and`/`or` blocks. Just click on the `Add clause` block to add a rule inside an `and`/`or` rule.

### Shortcuts

The rule builder allows you to quickly compose complex rules by allowing you to perform operations like cut, copy, paste, etc. on the rule blocks. Right click on any block to see the list of available options.

**Keyboard shortcuts:**

- `CTRL` + `C`: Copy the selected rule.
- `CTRL` + `X`: Cut the selected rule.
- `CTRL` + `ALT` + `C`: Copy the selected rule along with its children.
- `CTRL` + `V`: Paste the copied rule.
- `ALT` + `R`: Replace the selected rule.
- `DEL`: Delete the selected rule

Click on the `Shortcuts` button on the upper right corner of the rule builder to show these shortcuts.


> **💡 Pro Tip:** You can copy-paste blocks between security rule builders opened in different tabs.

## Testing security rules

To test the security rules that you have configured, you can try out APIs with different JWT claims in the `API Explorer` section of the Mission Control. The `API Explorer` comes in with a handy token builder to do so.

Head over to the API Explorer section and uncheck the `Bypass security rules` option.

![Testing Rules](/images/screenshots/testing-rules.png)

Then either paste the desired JWT token or click on the `Generate Token` button to the right to open the following modal:

![Token Builder](/images/screenshots/token-builder.png)

Provide the JWT claims that you wish to test the API with. The token builder creates a JWT token for you with the primary secret configured in Space Cloud. Click on the `Use this token` button to use the generated token in your queries.

> **Note:** Don't forget to uncheck the `Bypass security rules` option while testing. If this option is kept checked, then Mission Control will use the internal token of Space Cloud that bypasses all security rules. 