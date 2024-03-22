import DashHeader from "@/components/dashboard/DashHeader";
import SearchComp from "@/components/dashboard/SearchComp";
import ListPets from "@/components/dashboard/ListPets";
import DetailsPet from "@/components/dashboard/DetailsPet";
import ContentContainer from "@/components/dashboard/ContentContainer";
import Btn from "@/components/dashboard/Btn";

const DashboardPage = () => {
  return (
    <main>
      <DashHeader />
      <div className="grid md:grid-cols-3 grid-rows-[46px_300px_500px] md:grid-rows-[46px_1fr] gap-4 md:h-[500px] ">
        <div className="md:row-start-1 md:row-span-1 md:col-start-1 md:col-span-1 ">
          <SearchComp />
        </div>
        <div className=" relative md:row-start-2 md:row-span-full md:col-start-1 md:col-span-1">
          <ContentContainer>
            <ListPets />
            <Btn actionType="add" className="absolute bottom-4 right-4" />
          </ContentContainer>
        </div>
        <div className="md:row-start-1 md:row-span-full md:col-start-2 md:col-span-full">
          <ContentContainer>
            <DetailsPet />
          </ContentContainer>
        </div>
      </div>
    </main>
  );
};

export default DashboardPage;
