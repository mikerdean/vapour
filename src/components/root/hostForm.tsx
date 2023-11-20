import { createForm, valiForm } from "@modular-forms/solid";
import {
  coerce,
  integer,
  maxValue,
  minLength,
  minValue,
  number,
  object,
  string,
} from "valibot";

import { useHost } from "../context/hostProvider";
import type { Host } from "../context/hostProvider.types";
import Button from "../core/button";
import Heading from "../core/heading";
import Input from "../core/input";
import type { HostFormComponent } from "./hostForm.types";

const portMin = 1000;
const portMax = 99999;

const portPipeline = coerce(
  number([integer(), minValue(portMin), maxValue(portMax)]),
  Number,
);

const schema = object({
  hostname: string([minLength(1)]),
  httpPort: portPipeline,
  tcpPort: portPipeline,
});

const HostForm: HostFormComponent = () => {
  const [, { update }] = useHost();
  const [, { Field, Form }] = createForm<Host>({ validate: valiForm(schema) });

  const onSubmit = (newHost: Host) => {
    update(newHost);
  };

  return (
    <Form onSubmit={onSubmit}>
      <Heading level={1}>Enter host details</Heading>
      <Field name="hostname">
        {(field, props) => (
          <div class="mb-3">
            <Input
              {...props}
              error={field.error}
              label="Hostname"
              type="text"
            />
          </div>
        )}
      </Field>
      <Field name="httpPort" type="number">
        {(field, props) => (
          <div class="mb-3">
            <Input
              {...props}
              error={field.error}
              label="HTTP port"
              min={portMin}
              max={portMax}
              type="number"
            />
          </div>
        )}
      </Field>
      <Field name="tcpPort" type="number">
        {(field, props) => (
          <div class="mb-5">
            <Input
              {...props}
              error={field.error}
              label="TCP port"
              min={portMin}
              max={portMax}
              type="number"
            />
          </div>
        )}
      </Field>
      <div>
        <Button type="submit">Save</Button>
      </div>
    </Form>
  );
};

export default HostForm;
