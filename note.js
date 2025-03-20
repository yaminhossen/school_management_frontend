/* 
let data = new models.AccountLogsModel();
let image_path1 = '';

if (body['attachment']?.ext) {
    image_path1 =
        'uploads/accounts' +
        moment().format('YYYYMMDDHHmmss') +
        body['attachment'].name;
    await (fastify_instance as any).upload(body['attachment'], image_path1);
}


let income_attachments: anyObject[] = [];
for (let i = 0; i < parseInt(body.attachment?.length); i++) {
    let image_path = ``;
    let image_file = body.attachment[i];
    if (image_file?.ext) {
        image_path =
            'uploads/accounts' +
            moment().format('YYYYMMDDHHmmss') +
            image_file.name;
        await (fastify_instance as any).upload(image_file, image_path);
    }
    income_attachments.push({
        file: image_path,
    });
} 
 


let user = (req as any).user;
let auth_user = await models.BranchStaffsModel.findOne({
    where: {
        user_staff_id: (req as any).user.id,
    },
}); 

branch_id: auth_user?.branch_id || 1,
creator: user?.id || null,



// select option thsi silast

const meetingId = useRef<HTMLSelectElement>(null);
useEffect(() => {
    if (meetingId.current) {
        meetingId.current.value = state.item?.agenda?.meeting_id || ''; // Safely set the value
    }
    // console.log('Updated meetingId:', meetingId.current?.value);
}, [state.meeting]);

<select
    name="meeting_id"
    id=""
    ref={meetingId}
    // defaultValue={meetingId}
>
    {state?.meeting?.length &&
        state.meeting?.map(
            (i: {
                [key: string]: any;
            }) => {
                return (
                    <option
                        value={i.id}
                    >
                        {i.title}
                    </option>
                );
            },
        )}
</select>

// Tostar usecase
 const [file, setFile] = useState<any>();
    const handleSubmit = async (e) => {
        e.preventDefault();
        let formData = new FormData(e.target);

        try {
            const response = await axios.post(
                '/api/v1/account-logs/income-store',
                formData,
            );
            setData('Form submitted successfully!');
            (window as any).toaster('submitted');
            e.target.reset();
        } catch (error) {
            // setError(error);
        }
    };

    // day calculation
    
    const [apStartDate, setApStartDate] = useState('');
    const [apEndDate, setApEndDate] = useState('');
    const [aptotalDays, setApTotalDays] = useState(0);

    useEffect(() => {
        let ss_Date = moment(state.item.start_date).format('YYYY-MM-DD');
        setApStartDate(ss_Date);
        setApEndDate(moment(state.item.end_Date).format('YYYY-MM-DD'));
    }, [state.item]);
    console.log('star_date', apStartDate);
    console.log('end_date', apEndDate);

    const calculateDays = (start: string, end: string) => {
        const diff = moment(end).diff(moment(start), 'days');
        setApTotalDays(diff >= 0 ? diff : 0); // Prevent negative values
    };

    const handleStartDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setApStartDate(e.target.value);
        calculateDays(e.target.value, apEndDate);
    };

    const handleEndDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setApEndDate(e.target.value);
        calculateDays(apStartDate, e.target.value);
    };
*/
