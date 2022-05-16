# API Reference <a name="API Reference" id="api-reference"></a>

## Constructs <a name="Constructs" id="Constructs"></a>

### OpsReporter <a name="OpsReporter" id="cdk-ops-reporter.OpsReporter"></a>

#### Initializers <a name="Initializers" id="cdk-ops-reporter.OpsReporter.Initializer"></a>

```typescript
import { OpsReporter } from 'cdk-ops-reporter'

new OpsReporter(scope: Construct, id: string, props?: OpsReporterProps)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#cdk-ops-reporter.OpsReporter.Initializer.parameter.scope">scope</a></code> | <code>constructs.Construct</code> | *No description.* |
| <code><a href="#cdk-ops-reporter.OpsReporter.Initializer.parameter.id">id</a></code> | <code>string</code> | *No description.* |
| <code><a href="#cdk-ops-reporter.OpsReporter.Initializer.parameter.props">props</a></code> | <code><a href="#cdk-ops-reporter.OpsReporterProps">OpsReporterProps</a></code> | *No description.* |

---

##### `scope`<sup>Required</sup> <a name="scope" id="cdk-ops-reporter.OpsReporter.Initializer.parameter.scope"></a>

- *Type:* constructs.Construct

---

##### `id`<sup>Required</sup> <a name="id" id="cdk-ops-reporter.OpsReporter.Initializer.parameter.id"></a>

- *Type:* string

---

##### `props`<sup>Optional</sup> <a name="props" id="cdk-ops-reporter.OpsReporter.Initializer.parameter.props"></a>

- *Type:* <a href="#cdk-ops-reporter.OpsReporterProps">OpsReporterProps</a>

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#cdk-ops-reporter.OpsReporter.toString">toString</a></code> | Returns a string representation of this construct. |
| <code><a href="#cdk-ops-reporter.OpsReporter.addAlarm">addAlarm</a></code> | *No description.* |
| <code><a href="#cdk-ops-reporter.OpsReporter.addPipeline">addPipeline</a></code> | *No description.* |

---

##### `toString` <a name="toString" id="cdk-ops-reporter.OpsReporter.toString"></a>

```typescript
public toString(): string
```

Returns a string representation of this construct.

##### `addAlarm` <a name="addAlarm" id="cdk-ops-reporter.OpsReporter.addAlarm"></a>

```typescript
public addAlarm(alarm: IAlarm, options?: MonitorableOptions): void
```

###### `alarm`<sup>Required</sup> <a name="alarm" id="cdk-ops-reporter.OpsReporter.addAlarm.parameter.alarm"></a>

- *Type:* aws-cdk-lib.aws_cloudwatch.IAlarm

---

###### `options`<sup>Optional</sup> <a name="options" id="cdk-ops-reporter.OpsReporter.addAlarm.parameter.options"></a>

- *Type:* <a href="#cdk-ops-reporter.MonitorableOptions">MonitorableOptions</a>

---

##### `addPipeline` <a name="addPipeline" id="cdk-ops-reporter.OpsReporter.addPipeline"></a>

```typescript
public addPipeline(pipeline: IPipeline, options?: MonitorableOptions): void
```

###### `pipeline`<sup>Required</sup> <a name="pipeline" id="cdk-ops-reporter.OpsReporter.addPipeline.parameter.pipeline"></a>

- *Type:* aws-cdk-lib.aws_codepipeline.IPipeline

---

###### `options`<sup>Optional</sup> <a name="options" id="cdk-ops-reporter.OpsReporter.addPipeline.parameter.options"></a>

- *Type:* <a href="#cdk-ops-reporter.MonitorableOptions">MonitorableOptions</a>

---

#### Static Functions <a name="Static Functions" id="Static Functions"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#cdk-ops-reporter.OpsReporter.isConstruct">isConstruct</a></code> | Checks if `x` is a construct. |

---

##### ~~`isConstruct`~~ <a name="isConstruct" id="cdk-ops-reporter.OpsReporter.isConstruct"></a>

```typescript
import { OpsReporter } from 'cdk-ops-reporter'

OpsReporter.isConstruct(x: any)
```

Checks if `x` is a construct.

###### `x`<sup>Required</sup> <a name="x" id="cdk-ops-reporter.OpsReporter.isConstruct.parameter.x"></a>

- *Type:* any

Any object.

---

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#cdk-ops-reporter.OpsReporter.property.node">node</a></code> | <code>constructs.Node</code> | The tree node. |

---

##### `node`<sup>Required</sup> <a name="node" id="cdk-ops-reporter.OpsReporter.property.node"></a>

```typescript
public readonly node: Node;
```

- *Type:* constructs.Node

The tree node.

---


## Structs <a name="Structs" id="Structs"></a>

### MonitorableOptions <a name="MonitorableOptions" id="cdk-ops-reporter.MonitorableOptions"></a>

#### Initializer <a name="Initializer" id="cdk-ops-reporter.MonitorableOptions.Initializer"></a>

```typescript
import { MonitorableOptions } from 'cdk-ops-reporter'

const monitorableOptions: MonitorableOptions = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#cdk-ops-reporter.MonitorableOptions.property.displayName">displayName</a></code> | <code>string</code> | *No description.* |
| <code><a href="#cdk-ops-reporter.MonitorableOptions.property.link">link</a></code> | <code>string</code> | *No description.* |

---

##### `displayName`<sup>Optional</sup> <a name="displayName" id="cdk-ops-reporter.MonitorableOptions.property.displayName"></a>

```typescript
public readonly displayName: string;
```

- *Type:* string

---

##### `link`<sup>Optional</sup> <a name="link" id="cdk-ops-reporter.MonitorableOptions.property.link"></a>

```typescript
public readonly link: string;
```

- *Type:* string

---

### OpsReporterProps <a name="OpsReporterProps" id="cdk-ops-reporter.OpsReporterProps"></a>

#### Initializer <a name="Initializer" id="cdk-ops-reporter.OpsReporterProps.Initializer"></a>

```typescript
import { OpsReporterProps } from 'cdk-ops-reporter'

const opsReporterProps: OpsReporterProps = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#cdk-ops-reporter.OpsReporterProps.property.federationImpliesConsole">federationImpliesConsole</a></code> | <code>boolean</code> | Drop the domain from the federation link. |
| <code><a href="#cdk-ops-reporter.OpsReporterProps.property.federationLink">federationLink</a></code> | <code>string</code> | Federation link with '{}' as placeholder. |

---

##### `federationImpliesConsole`<sup>Optional</sup> <a name="federationImpliesConsole" id="cdk-ops-reporter.OpsReporterProps.property.federationImpliesConsole"></a>

```typescript
public readonly federationImpliesConsole: boolean;
```

- *Type:* boolean
- *Default:* false

Drop the domain from the federation link.

---

##### `federationLink`<sup>Optional</sup> <a name="federationLink" id="cdk-ops-reporter.OpsReporterProps.property.federationLink"></a>

```typescript
public readonly federationLink: string;
```

- *Type:* string

Federation link with '{}' as placeholder.

---



