import Box from "@mui/material/Box";
import Rating, { type RatingProps } from "@mui/material/Rating";
import { styled } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import { FaRegStar, FaStar } from "react-icons/fa";

const StyledRating = styled(Rating)({
    "& .MuiRating-iconFilled": {
        color: "#ff6d75",
    },
    "& .MuiRating-iconHover": {
        color: "#ff3d47",
    },
});

interface ICustomRatingProps extends RatingProps {
    legend?: React.ReactNode;
}

const CustomRating = (props: ICustomRatingProps) => {
    const { legend, value, ...otherProps } = props;

    return (
        <Box
            sx={{
                "& > legend": { mt: 2 },
            }}
        >
            {legend ? <Typography component="legend">{legend}</Typography> : null}
            <StyledRating
                precision={1}
                defaultValue={0}
                {...otherProps}
                name="customized-color"
                value={value}
                getLabelText={(value: number) => `${value} Heart${value !== 1 ? "s" : ""}`}
                icon={<FaStar fontSize="inherit" />}
                emptyIcon={<FaRegStar fontSize="inherit" />}
            />
        </Box>
    );
};

export default CustomRating;
