// src/components/dashboard/StatCards.jsx
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  Users,
  ShoppingBag,
  PlusSquare,
  DollarSign,
} from "lucide-react";

// 🔢 Animated counter hook
const useCountUp = (end, duration = 800) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const stepTime = Math.max(Math.floor(duration / end), 20);

    const counter = setInterval(() => {
      start += 1;
      setCount(start);
      if (start >= end) clearInterval(counter);
    }, stepTime);

    return () => clearInterval(counter);
  }, [end, duration]);

  return count;
};

const stats = [
  {
    label: "Total Users",
    value: 498,
    suffix: "",
    icon: Users,
    glow: "from-cyan-400 to-blue-500",
    iconBg: "bg-cyan-500/15 text-cyan-500",
  },
  {
    label: "Today Rent",
    value: 18,
    suffix: "",
    icon: ShoppingBag,
    glow: "from-sky-400 to-indigo-500",
    iconBg: "bg-sky-500/15 text-sky-500",
  },
  {
    label: "Today's Rent Post",
    value: 35,
    suffix: "",
    icon: PlusSquare,
    glow: "from-orange-400 to-orange-500",
    iconBg: "bg-orange-500/15 text-orange-500",
  },
  {
    label: "Total Revenue",
    value: 748,
    suffix: "$",
    icon: DollarSign,
    glow: "from-amber-600 to-yellow-800",
    iconBg: "bg-amber-500/20 text-amber-700",
  },
];

function StatCards() {
  return (
    <section className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
      {stats.map((item, index) => {
        const Icon = item.icon;
        const count = useCountUp(item.value);

        return (
          <motion.article
            key={item.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{
              y: -6,
              boxShadow: "0 20px 40px rgba(0,0,0,0.08)",
            }}
            className="relative overflow-hidden rounded-2xl border border-white/40 
            bg-white/70 backdrop-blur-xl p-4 dark:bg-slate-900/60"
          >
            {/* Glow background */}
            <div
              className={`absolute -top-10 -right-10 h-28 w-28 rounded-full 
              bg-gradient-to-br ${item.glow} opacity-30 blur-2xl`}
            />

            {/* Content */}
            <div className="relative flex items-center gap-4">
              {/* Icon */}
              <div
                className={`h-12 w-12 rounded-xl flex items-center justify-center ${item.iconBg}`}
              >
                <Icon size={22} />
              </div>

              {/* Text */}
              <div className="flex-1">
                <p className="text-xs font-medium text-slate-900">
                  {item.label}
                </p>
                <p className="text-2xl font-semibold text-slate-900 dark:text-white">
                  {item.suffix === "$" ? "$" : ""}
                  {count.toLocaleString()}
                </p>
              </div>
            </div>
          </motion.article>
        );
      })}
    </section>
  );
}

export default StatCards;
