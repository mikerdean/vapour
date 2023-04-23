import { createForm, zodForm } from "@modular-forms/solid";
import { z } from "zod";

import { useHost } from "../../../state/host";
import { Host } from "../../../state/host/types";
import Button from "../../core/button";
import Heading from "../../core/heading";
import Input from "../../core/input";
import type { HostFormComponent } from "./types";

const schema = z.object({
  hostname: z.string().min(1),
  httpPort: z.coerce.number().int().gte(1000).lte(99999),
  tcpPort: z.coerce.number().int().gte(1000).lte(99999),
});

const HostForm: HostFormComponent = () => {
  const { setHost } = useHost();
  const [, { Field, Form }] = createForm<Host>({ validate: zodForm(schema) });

  const onSubmit = (newHost: Host) => {
    setHost(newHost);
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
              min={1000}
              max={99999}
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
              min={1000}
              max={99999}
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
