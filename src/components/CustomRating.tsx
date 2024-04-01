import { styled } from "@mui/material/styles";
import Rating, { type RatingProps } from "@mui/material/Rating";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { FaStar, FaRegStar } from "react-icons/fa";

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
                {...otherProps}
                name="customized-color"
                defaultValue={0}
                value={value}
                getLabelText={(value: number) => `${value} Heart${value !== 1 ? "s" : ""}`}
                precision={1}
                icon={<FaStar fontSize="inherit" />}
                emptyIcon={<FaRegStar fontSize="inherit" />}
            />
        </Box>
    );
};

export default CustomRating;
