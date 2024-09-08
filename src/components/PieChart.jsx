import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";



function PieRechartComponent ({data}) {
   const COLORS = ["#A000FF","#FF9304","#FDE006"];

   const RADIAN = Math.PI / 180;
   const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
   const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
   const x = cx + radius * Math.cos(-midAngle * RADIAN);
   const y = cy + radius * Math.sin(-midAngle * RADIAN);

   return (
      <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
         {`${(percent * 100).toFixed(0)}%`}
      </text>
   );
   };
   
   const CustomTooltip = ({ active, payload, label }) => {
         if (active) {
            return (
            <div
               className="custom-tooltip"
               style={{
                  backgroundColor: "black",
                  padding: "5px",
                  border: "1px solid black"
               }}
            >
               <label>{`${payload[0].name} : ₹${payload[0].value}`}</label>
            </div>
         );
      }
      return null;
   };
   return (
      <PieChart width={300} height={300}>
      <Pie
         data={data}
         label={renderCustomizedLabel}
         labelLine={false}
         dataKey="value"
         nameKey="name"
         cx="50%"
         cy="50%"
         outerRadius={120}
      >
         {data.map((entry, index) => (
            <Cell
               key={`cell-${index}`}
               fill={COLORS[index % COLORS.length]}
            />
         ))}
      </Pie>
      <Tooltip content={<CustomTooltip />} />
      <Legend />
      </PieChart>
      );
}
export default PieRechartComponent;