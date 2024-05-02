import Image from "next/image";
export default function Topbar() {
  return (
    <div
      style={{ display: "flex", justifyContent: "center", paddingTop: "1rem" }}
    >
      <Image
        src={require("@/public/logo.png")}
        width={154}
        alt="logo vezipret"
      />
    </div>
  );
}
