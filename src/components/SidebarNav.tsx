const SidebarNav = ({ title, navigation }: SidebarNavProps) => {
  return (
    <div className="flex flex-col gap-2">
      <h3 className="sidebar-h3">{title}</h3>
      <div className="ml-4 flex flex-col gap-1">
        {navigation.map((item) => (
          <ul key={item.title}>
            <li className="flex gap-2">
              {/* <Image src={item.imgUrl} alt={item.title} /> */}
              <p> {item.title}</p>
            </li>
            {item.children && (
              <ul className="ml-6 flex flex-col gap-1">
                {item.children.map((child) => (
                  <li key={child} className="text-sm">
                    {child}
                  </li>
                ))}
              </ul>
            )}
          </ul>
        ))}
      </div>
    </div>
  );
};

export default SidebarNav;
