import Box from "@src/components/Box/Box";
import Button from "@src/components/Button/Button";
import Image from "@src/components/Image/Image";
import Text from "@src/components/Text/Text";
import { BaseComponent } from "@src/theme/BaseComponent";
import { ChangeEvent, useState } from "react";

function useForm({ initialValues }) {
  const [values, setValues] = useState(initialValues);
  return {
    values,
    handleChange(event) {
      const { name, value } = event.target;
      setValues({ ...values, [name]: value });
    },
  };
}

export default function NewsletterScreen() {
  const form = useForm({ initialValues: { email: "" } });
  return (
    <Box
      styleSheet={{ flex: 1, alignItems: "center", justifyContent: "center" }}
    >
      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (!form.values.email.includes("@")) {
            alert("Email inválido.");
            return;
          }
          alert("Enviado!");

          fetch("api/newsletter/optin", {
            method: "POST",
            headers: {
              "Content-type": "application/json",
            },
            body: JSON.stringify(form.values),
          }).then(async (res) => {
            console.log(await res.json());
          });
        }}
      >
        <Box
          styleSheet={{
            alignItems: "center",
            width: "100%",
            maxWidth: "400px",
            padding: "16px",
          }}
        >
          <Text variant="heading2">Newsletter</Text>
          <Image
            src="https://github.com/omariosouto.png"
            alt="Foto do DevSoutinho"
            styleSheet={{
              borderRadius: "100%",
              width: "100px",
              marginBotton: "16px",
              marginTop: "16px",
            }}
          />
          <Textfield
            placeholder="Informe seu email"
            value={form.values.email}
            name="email"
            onChange={form.handleChange}
          />
          <Button fullWidth styleSheet={{ marginTop: "16px" }}>
            Cadastrar
          </Button>
        </Box>
      </form>
    </Box>
  );
}

interface TextfieldProps {
  placeholder?: string;
  value?: string;
  name: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
}
function Textfield(props: TextfieldProps) {
  return (
    <Box styleSheet={{ width: "100%", maxWidth: "300px" }}>
      <BaseComponent
        as="input"
        {...props}
        styleSheet={{
          border: "1px solid rgb(195, 195, 195)",
          borderRadius: "4px",
          padding: "8px",
          width: "100%",
          marginTop: "16px",
        }}
      />
    </Box>
  );
}
