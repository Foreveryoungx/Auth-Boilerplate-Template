import {CardWrapper} from '@/components/auth/card-wrapper';

export const ErrorCard = () => {
    return (
        <CardWrapper
        headerLabel={"Opps! Something went wrong"}
        backButtonHref={"/auth/login"}
        backButtonLabel={"Back to login"}
        >
            <div className={"w-full flex justify-center items-center"}>
                ⚠️
            </div>
        </CardWrapper>
    )
}