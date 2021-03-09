import { useCMS } from "tinacms";

export default function EditButton() {
  const cms = useCMS();
  return (
    <>
      <button
        onClick={() => {
          cms.toggle();
        }}
      >
        {cms.enabled ? "Exit Edit Mode" : "Edit This Site"}
      </button>
    </>
  );
}
