import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Registration Successful",
  description:
    "Your registration has been successfully completed. We will contact you soon.",
  openGraph: {
    title: "Registration Successful",
    description:
      "Your registration has been successfully completed. We will contact you soon.",
    type: "website",
  },
};

export default function SuccessPage() {
  return (
    <div>
      <h1>Registration Successful</h1>
      <p>Thank you for registering! We will contact you soon.</p>
    </div>
  );
}
