const messages = [
  "Free shipping & returns on all orders",
  "100% genuine cowhide leather",
  "Handcrafted in small batches",
  "Site updated June 2026",
];

export function AnnouncementBar() {
  return (
    <div className="bg-black py-2.5 text-center text-[11px] tracking-[0.15em] text-white uppercase">
      <p>{messages.join("  •  ")}</p>
    </div>
  );
}
